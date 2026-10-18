// Emails sent when someone uses the Contact or Request Samples form on
// hulmacebu.com. Table-based with inline styles so they hold up in Gmail and
// Outlook. Images live in the public `email-assets` Storage bucket.

const SITE = 'https://www.hulmacebu.com';
const ASSETS = 'https://ivebatozsqjbpnohwrrl.supabase.co/storage/v1/object/public/email-assets';

const C = {
  ink: '#3F443F',
  brown: '#766C62',
  taupe: '#BFB8AE',
  ghost: '#F5F4F0',
  accent: '#B18D75',
  line: '#E8E4DE',
};
const SERIF = "'Nunito','Helvetica Neue',Helvetica,Arial,sans-serif";
const SANS = "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif";

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const first = (name: string) => name.trim().split(/\s+/)[0] || 'there';
const pad2 = (n: number) => String(n).padStart(2, '0');

// ---- building blocks (all return trusted HTML; callers escape user text) ----

const eyebrow = (text: string) =>
  `<p style="margin:0 0 14px;font-family:${SANS};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.brown}">${text}</p>`;

const headline = (html: string) =>
  `<h1 style="margin:0 0 24px;font-family:${SERIF};font-size:32px;line-height:1.2;font-weight:300;color:${C.ink}">${html}</h1>`;

const accent = (html: string) => `<span style="color:${C.accent};white-space:nowrap">${html}</span>`;

const p = (html: string, muted = false) =>
  `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.65;color:${muted ? C.brown : C.ink}">${html}</p>`;

const label = (text: string) =>
  `<p style="margin:24px 0 10px;font-family:${SANS};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${C.brown}">${text}</p>`;

const quote = (text: string) =>
  `<div style="margin:0 0 20px;padding:18px 20px;background:${C.ghost};border-radius:10px;font-family:${SANS};font-size:14px;line-height:1.65;color:${C.ink};white-space:pre-wrap">${esc(text)}</div>`;

const arrowLink = (text: string, url: string) =>
  `<p style="margin:8px 0 0;font-family:${SANS};font-size:14px;font-weight:500"><a href="${url}" style="color:${C.ink};text-decoration:none">${text} &rarr;</a></p>`;

const button = (text: string, url: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px"><tr><td style="background:${C.ink};border-radius:999px">
     <a href="${url}" style="display:inline-block;padding:13px 26px;font-family:${SANS};font-size:14px;font-weight:500;color:#ffffff;text-decoration:none">${text}</a>
   </td></tr></table>`;

/** Label/value rows. Values are escaped here. */
function details(rows: [string, string | null | undefined][]) {
  const body = rows.filter(([, v]) => v).map(([k, v]) => `
    <tr>
      <td style="padding:11px 0;border-top:1px solid ${C.line};width:130px;vertical-align:top;font-family:${SANS};font-size:13px;color:${C.brown}">${k}</td>
      <td style="padding:11px 0;border-top:1px solid ${C.line};font-family:${SANS};font-size:14px;color:${C.ink}">${esc(String(v))}</td>
    </tr>`).join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;border-bottom:1px solid ${C.line}">${body}</table>`;
}

/** Numbered two-column list, after the "01 / 02 / 03" grid on the site. */
function numbered(items: string[]) {
  const cells = items.map((item, i) => `
    <td width="50%" style="padding:0 12px 18px 0;vertical-align:top">
      <div style="border-left:1px solid ${C.taupe};padding:2px 0 2px 16px">
        <div style="font-family:${SERIF};font-size:14px;color:${C.accent};margin-bottom:4px">${pad2(i + 1)}</div>
        <div style="font-family:${SERIF};font-size:18px;line-height:1.3;color:${C.ink}">${esc(item)}</div>
      </div>
    </td>`);
  const rows: string[] = [];
  for (let i = 0; i < cells.length; i += 2) rows.push(`<tr>${cells[i]}${cells[i + 1] ?? '<td width="50%"></td>'}</tr>`);
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 8px">${rows.join('')}</table>`;
}

const socials: [string, string][] = [
  ['Facebook', 'https://www.facebook.com/hulmacebu/'],
  ['Instagram', 'https://www.instagram.com/hulmafiberglasscebu/'],
  ['TikTok', 'https://www.tiktok.com/@hulmacebu'],
  ['LinkedIn', 'https://www.linkedin.com/company/hulmafiberglasscebu'],
];

const footerLink = (text: string, url: string) =>
  `<a href="${url}" style="color:${C.brown};text-decoration:none">${text}</a>`;

function frame(opts: { preheader: string; hero?: string; heroAlt?: string; body: string; note: string; brandFooter?: boolean }) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Nunito:wght@300;400&display=swap" rel="stylesheet">
<style>
  @media (max-width:620px){
    .wrap{padding:20px 12px !important}
    .inner{padding:28px 24px !important}
    .h1 h1{font-size:27px !important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.ghost}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ghost}">
  <tr><td class="wrap" align="center" style="padding:36px 16px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
      <tr><td style="padding:0 4px 24px">
        <a href="${SITE}"><img src="${ASSETS}/hulma-logo.png" alt="Hulma" width="128" height="32" style="display:block;border:0"></a>
      </td></tr>
      <tr><td style="background:#ffffff;border-radius:16px;overflow:hidden">
        ${opts.hero ? `<img src="${opts.hero}" alt="${esc(opts.heroAlt ?? '')}" width="600" style="display:block;width:100%;height:auto;border:0;border-radius:16px 16px 0 0">` : ''}
        <div class="inner h1" style="padding:40px 44px">${opts.body}</div>
      </td></tr>
      <tr><td style="padding:32px 4px 0;font-family:${SANS}">
        ${opts.brandFooter === false ? '' : `
        <p style="margin:0 0 18px;font-family:${SERIF};font-size:20px;font-weight:300;color:${C.ink}">Your Vision, ${accent('Our Craft.')}</p>
        <p style="margin:0 0 8px;font-size:13px;line-height:1.7">
          ${footerLink('Projects', `${SITE}/projects`)} &nbsp;&middot;&nbsp; ${footerLink('Request samples', `${SITE}/request-samples`)} &nbsp;&middot;&nbsp; ${footerLink('Book a presentation', `${SITE}/book-presentation`)}
        </p>
        <p style="margin:0 0 20px;font-size:13px;line-height:1.7">
          ${socials.map(([n, u]) => footerLink(n, u)).join(' &nbsp;&middot;&nbsp; ')}
        </p>`}
        <p style="margin:0;font-size:11px;line-height:1.6;color:${C.taupe}">${opts.note}</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

const CUSTOMER_NOTE =
  `You’re receiving this because you contacted Hulma Cebu through <a href="${SITE}" style="color:${C.taupe}">hulmacebu.com</a>.`;
const TEAM_NOTE = `Sent from the forms on <a href="${SITE}" style="color:${C.taupe}">hulmacebu.com</a>.`;

// ---- the four emails ----

export interface Enquiry {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  projectType: string | null;
  message: string | null;
  materials: string[];
  colors: string[];
  shipTo: string | null;
}

/** To the person who used the Contact form. */
export function contactConfirmation(e: Enquiry) {
  const excerpt = e.message && e.message.length > 400 ? e.message.slice(0, 400).trimEnd() + '…' : e.message;
  return {
    subject: 'We received your message',
    html: frame({
      preheader: 'Thanks for getting in touch. We’ll get back to you within 24 hours.',
      hero: `${ASSETS}/hero-contact.jpg`,
      heroAlt: 'Curved fiberglass walls by Hulma',
      body:
        eyebrow('Message received')
        + headline(`We received your ${accent('message')}`)
        + p(`Hi ${esc(first(e.name))},`)
        + p('Thanks for getting in touch with Hulma. Our team will get back to you within 24 hours.')
        + (excerpt ? label('Your message') + quote(excerpt) : '')
        + p('If you’d like to add anything, like drawings, photos or measurements, just reply to this email.', true)
        + arrowLink('See our recent projects', `${SITE}/projects`),
      note: CUSTOMER_NOTE,
    }),
    text: [
      `Hi ${first(e.name)},`, '',
      'Thanks for getting in touch with Hulma. Our team will get back to you within 24 hours.', '',
      'If you’d like to add anything, like drawings, photos or measurements, just reply to this email.', '',
      'Hulma Cebu', `${SITE}`,
      ...(e.message ? ['', '---', 'Your message:', e.message] : []),
    ].join('\n'),
  };
}

/** To the person who used the Request Samples form. */
export function samplesConfirmation(e: Enquiry) {
  return {
    subject: 'We received your sample request',
    html: frame({
      preheader: 'We’ll prepare your samples and contact you to confirm delivery.',
      hero: `${ASSETS}/hero-samples.jpg`,
      heroAlt: 'Stone-look fiberglass finishes by Hulma',
      body:
        eyebrow('Sample request received')
        + headline(`We received your ${accent('sample request')}`)
        + p(`Hi ${esc(first(e.name))},`)
        + p('Thanks for your interest in Hulma. Here’s what you asked for:')
        + numbered(e.materials)
        + details([
            ['Colors', e.colors.join(', ') || null],
            ['Ship to', e.shipTo],
          ])
        + p('We’ll prepare your samples and contact you to confirm the details and delivery.')
        + p('Want to see the materials in person first?', true)
        + arrowLink('Book a presentation with our team', `${SITE}/book-presentation`),
      note: CUSTOMER_NOTE,
    }),
    text: [
      `Hi ${first(e.name)},`, '',
      'Thanks for your interest in Hulma. We received your sample request for:',
      ...e.materials.map((m, i) => `${pad2(i + 1)}  ${m}`), '',
      ...(e.colors.length ? [`Colors: ${e.colors.join(', ')}`] : []),
      ...(e.shipTo ? [`Ship to: ${e.shipTo}`] : []), '',
      'We’ll prepare your samples and contact you to confirm the details and delivery.', '',
      'Hulma Cebu', `${SITE}`,
    ].join('\n'),
  };
}

/** To Hulma, for either form. Replying goes to the customer (reply_to is set by the caller). */
export function teamNotification(form: 'contact' | 'samples', e: Enquiry) {
  const samples = form === 'samples';
  const subject = samples
    ? `Sample request from ${e.name} — ${e.materials.length} material${e.materials.length > 1 ? 's' : ''}`
    : `New enquiry from ${e.name}${e.projectType ? ` — ${e.projectType}` : ''}`;
  const reply = `mailto:${e.email}?subject=${encodeURIComponent(samples ? 'Your Hulma sample request' : 'Re: Your enquiry to Hulma')}`;

  return {
    subject,
    html: frame({
      preheader: samples ? `${e.materials.join(', ')}` : (e.message ?? '').slice(0, 120),
      body:
        eyebrow(samples ? 'New sample request' : 'New enquiry')
        + headline(`${samples ? 'Sample request' : 'Enquiry'} from ${accent(esc(e.name))}`)
        + details([
            ['Email', e.email],
            ['Phone', e.phone],
            ['Company', e.company],
            ['Project type', e.projectType],
            ...(samples ? [['Colors', e.colors.join(', ') || null], ['Ship to', e.shipTo]] as [string, string | null][] : []),
          ])
        + (samples ? label('Materials') + numbered(e.materials) : '')
        + (e.message ? label(samples ? 'Notes' : 'Their message') + quote(e.message) : '')
        + button(`Reply to ${esc(first(e.name))}`, reply)
        + `<p style="margin:14px 0 0;font-family:${SANS};font-size:14px;line-height:1.6;color:${C.brown}">Or just hit reply. It goes straight to them.</p>`,
      note: TEAM_NOTE,
      brandFooter: false,
    }),
    text: [
      subject, '',
      `Email: ${e.email}`,
      ...(e.phone ? [`Phone: ${e.phone}`] : []),
      ...(e.company ? [`Company: ${e.company}`] : []),
      ...(e.projectType ? [`Project type: ${e.projectType}`] : []),
      ...(samples ? [`Materials: ${e.materials.join(', ')}`] : []),
      ...(samples && e.colors.length ? [`Colors: ${e.colors.join(', ')}`] : []),
      ...(samples && e.shipTo ? [`Ship to: ${e.shipTo}`] : []),
      ...(e.message ? ['', e.message] : []),
      '', 'Reply to this email to answer them directly.',
    ].join('\n'),
  };
}
