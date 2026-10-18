import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import AdminLayout, { refreshNewEnquiryCount } from '../AdminLayout';
import { Btn, Drawer, card } from '../ui';

type Status = 'new' | 'replied' | 'archived';

interface Enquiry {
  id: string;
  created_at: string;
  form: 'contact' | 'samples';
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  message: string | null;
  materials: string[] | null;
  colors: string[] | null;
  shipping_address: string | null;
  city: string | null;
  status: Status;
}

const TABS: { key: Status | 'all'; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'replied', label: 'Replied' },
  { key: 'archived', label: 'Archived' },
  { key: 'all', label: 'All' },
];

let cache: Enquiry[] | null = null;

const fullName = (e: Enquiry) => [e.first_name, e.last_name].filter(Boolean).join(' ');
const when = (iso: string) => {
  const d = new Date(iso);
  const sameDay = d.toDateString() === new Date().toDateString();
  return sameDay
    ? d.toLocaleTimeString('en-PH', { hour: 'numeric', minute: '2-digit' })
    : d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric' });
};
const summary = (e: Enquiry) =>
  e.form === 'samples' ? `Samples: ${(e.materials ?? []).join(', ')}` : (e.message ?? '').replace(/\s+/g, ' ');

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-4 border-t border-gray-100 py-2.5 text-[13px] first:border-t-0">
      <span className="w-28 flex-shrink-0 text-gray-500">{label}</span>
      <span className="min-w-0 flex-1 break-words text-gray-900">{value}</span>
    </div>
  );
}

export default function EnquiriesAdmin() {
  const [rows, setRows] = useState<Enquiry[] | null>(cache);
  const [tab, setTab] = useState<Status | 'all'>('new');
  const [openId, setOpenId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)
      .then(({ data, error }) => {
        if (error) return setError(error.message);
        cache = data as Enquiry[];
        setRows(cache);
      });
  }, []);

  const counts = useMemo(() => {
    const c = { new: 0, replied: 0, archived: 0, all: rows?.length ?? 0 };
    rows?.forEach((r) => c[r.status]++);
    return c;
  }, [rows]);

  const shown = (rows ?? []).filter((r) => tab === 'all' || r.status === tab);
  const open = rows?.find((r) => r.id === openId) ?? null;

  const setStatus = async (e: Enquiry, status: Status) => {
    const next = (rows ?? []).map((r) => (r.id === e.id ? { ...r, status } : r));
    cache = next;
    setRows(next);
    const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', e.id);
    if (error) setError(error.message);
    refreshNewEnquiryCount();
  };

  const remove = async (e: Enquiry) => {
    if (!window.confirm(`Delete the enquiry from ${fullName(e)}? This can’t be undone.`)) return;
    const { error } = await supabase.from('contact_submissions').delete().eq('id', e.id);
    if (error) return setError(error.message);
    cache = (rows ?? []).filter((r) => r.id !== e.id);
    setRows(cache);
    setOpenId(null);
    refreshNewEnquiryCount();
  };

  const replyHref = (e: Enquiry) =>
    `mailto:${e.email}?subject=${encodeURIComponent(e.form === 'samples' ? 'Your Hulma sample request' : 'Re: Your enquiry to Hulma')}`;

  return (
    <AdminLayout title="Enquiries">
      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</p>
      )}

      <div className="mb-4 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              tab === t.key ? 'bg-[#3F443F] text-white' : 'text-gray-500 hover:bg-white/70 hover:text-gray-800'
            }`}
          >
            {t.label}
            <span className={`ml-1.5 ${tab === t.key ? 'text-white/70' : 'text-gray-400'}`}>{counts[t.key]}</span>
          </button>
        ))}
      </div>

      {rows === null && !error && <p className="py-16 text-center text-[13px] text-gray-400">Loading…</p>}

      {rows && (
        <div className={`${card} overflow-hidden`}>
          {shown.map((e) => (
            <button
              key={e.id}
              onClick={() => setOpenId(e.id)}
              className="flex w-full items-center gap-4 border-t border-gray-100 px-4 py-3 text-left first:border-t-0 hover:bg-stone-50/70"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className={`truncate text-[14px] ${e.status === 'new' ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                    {fullName(e)}
                  </p>
                  {e.form === 'samples' && (
                    <span className="flex-shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600">
                      Samples
                    </span>
                  )}
                </div>
                <p className="truncate text-[13px] text-gray-500">{summary(e)}</p>
              </div>
              <span className="flex-shrink-0 text-[12px] text-gray-400">{when(e.created_at)}</span>
            </button>
          ))}
          {shown.length === 0 && (
            <p className="px-4 py-14 text-center text-[13px] text-gray-400">
              {tab === 'new' ? 'No new enquiries.' : 'Nothing here.'}
            </p>
          )}
        </div>
      )}

      <Drawer
        open={!!open}
        onClose={() => setOpenId(null)}
        title={open ? fullName(open) : ''}
        footer={
          open && (
            <>
              <button onClick={() => remove(open)} className="mr-auto text-[13px] font-medium text-red-600 hover:underline">
                Delete
              </button>
              {open.status !== 'archived' ? (
                <Btn variant="outline" onClick={() => setStatus(open, 'archived')}>
                  Archive
                </Btn>
              ) : (
                <Btn variant="outline" onClick={() => setStatus(open, 'new')}>
                  Move to New
                </Btn>
              )}
              {open.status === 'new' && (
                <Btn variant="outline" onClick={() => setStatus(open, 'replied')}>
                  Mark replied
                </Btn>
              )}
              <a
                href={replyHref(open)}
                onClick={() => open.status === 'new' && setStatus(open, 'replied')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3F443F] px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90"
              >
                Reply
              </a>
            </>
          )
        }
      >
        {open && (
          <>
            <p className="text-[12px] text-gray-500">
              {open.form === 'samples' ? 'Sample request' : 'Contact form'} ·{' '}
              {new Date(open.created_at).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
            <div>
              <Row label="Email" value={open.email} />
              <Row label="Phone" value={open.phone} />
              <Row label="Company" value={open.company} />
              <Row label="Project type" value={open.project_type} />
              <Row label="Materials" value={(open.materials ?? []).join(', ')} />
              <Row label="Colors" value={(open.colors ?? []).join(', ')} />
              <Row label="Ship to" value={[open.shipping_address, open.city].filter(Boolean).join(', ')} />
            </div>
            {open.message && (
              <div className="whitespace-pre-wrap rounded-xl bg-stone-50 px-4 py-3 text-[14px] leading-relaxed text-gray-800">
                {open.message}
              </div>
            )}
          </>
        )}
      </Drawer>
    </AdminLayout>
  );
}
