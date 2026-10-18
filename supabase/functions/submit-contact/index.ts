import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { contactConfirmation, samplesConfirmation, teamNotification, type Enquiry } from './email.ts';

// Handles both public forms: Contact (form: 'contact') and Request Samples
// (form: 'samples'). Saves the enquiry, emails it to Hulma, and sends the
// person a confirmation. Both emails go out via Resend.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
// Comma-separated list, so another inbox can be added without a redeploy.
const NOTIFY_EMAILS = (Deno.env.get('NOTIFY_EMAIL') ?? 'hulmacebu@gmail.com')
  .split(',').map((s) => s.trim()).filter(Boolean);
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'Hulma Cebu <talk@hulmacebu.com>';
// Where customers' replies to the confirmation land.
const REPLY_TO = Deno.env.get('REPLY_TO') ?? 'hulmacebu@gmail.com';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const cors = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: cors });

// Public input: trim, cap length, and drop empties.
const str = (v: unknown, max: number) =>
  typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null;
const list = (v: unknown) =>
  Array.isArray(v) ? v.map((x) => str(x, 60)).filter((x): x is string => !!x).slice(0, 20) : [];

const sendEmail = (payload: Record<string, unknown>) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, ...payload }),
  }).catch((e) => { console.error('resend request failed', e); return null; });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const body = await req.json();

    // Honeypot: a hidden field real visitors never fill. Pretend it worked.
    if (str(body.website, 200)) return json({ ok: true });

    const form = body.form === 'samples' ? 'samples' : 'contact';
    const firstName = str(body.firstName, 100);
    const lastName = str(body.lastName, 100);
    const email = str(body.email, 200)?.toLowerCase() ?? null;
    const phone = str(body.phone, 50);
    const company = str(body.company, 200);
    const projectType = str(body.projectType, 50);
    const message = str(form === 'samples' ? body.notes : body.message, 2000);
    const materials = list(body.materials);
    const colors = list(body.colors);
    const shippingAddress = str(body.shippingAddress, 300);
    const city = str(body.city, 120);

    if (!firstName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Missing required fields' }, 400);
    }
    if (form === 'contact' && !message) return json({ error: 'Missing required fields' }, 400);
    if (form === 'samples' && (!shippingAddress || materials.length === 0)) {
      return json({ error: 'Missing required fields' }, 400);
    }

    // The form is public, so cap how often one address can use it, and only
    // send the confirmation for the first submission per address per day.
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const [{ count: lastHour }, { count: lastDay }] = await Promise.all([
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true })
        .eq('email', email).gte('created_at', hourAgo),
      supabase.from('contact_submissions').select('id', { count: 'exact', head: true })
        .eq('email', email).gte('created_at', dayAgo),
    ]);
    if ((lastHour ?? 0) >= 5) return json({ error: 'Too many submissions. Please try again later.' }, 429);

    const { data: saved, error: dbError } = await supabase.from('contact_submissions').insert({
      form,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company,
      project_type: projectType,
      message,
      materials: form === 'samples' ? materials : null,
      colors: form === 'samples' ? colors : null,
      shipping_address: shippingAddress,
      city,
    }).select('id').single();

    if (dbError) return json({ error: dbError.message }, 500);

    const enquiry: Enquiry = {
      name: [firstName, lastName].filter(Boolean).join(' '),
      email,
      phone,
      company,
      projectType,
      message,
      materials,
      colors,
      shipTo: [shippingAddress, city].filter(Boolean).join(', ') || null,
    };

    // The enquiry is already saved, so a failed email doesn't fail the form.
    const team = teamNotification(form, enquiry);
    const res = await sendEmail({ to: NOTIFY_EMAILS, reply_to: email, ...team });
    if (res?.ok) {
      await supabase.from('contact_submissions').update({ email_sent: true }).eq('id', saved.id);
    } else if (res) {
      console.error('resend error', res.status, await res.text());
    }

    if (!lastDay) {
      const confirmation = form === 'samples' ? samplesConfirmation(enquiry) : contactConfirmation(enquiry);
      const ack = await sendEmail({ to: [email], reply_to: REPLY_TO, ...confirmation });
      if (ack && !ack.ok) console.error('confirmation error', ack.status, await ack.text());
    }

    return json({ ok: true });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
});
