import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { DEFAULT_SETTINGS, refreshContent, type SiteSettings } from '../../../lib/cms';
import AdminLayout from '../AdminLayout';
import { Btn, Field, FormSection, TextInput, card } from '../ui';

const FIELDS: { title: string; hint?: string; fields: [keyof SiteSettings, string, string?][] }[] = [
  {
    title: 'Contact',
    hint: 'Shown on the Contact page and in the footer.',
    fields: [
      ['email', 'Email'],
      ['phone', 'Phone'],
      ['hours', 'Opening hours'],
    ],
  },
  {
    title: 'Location',
    fields: [
      ['address', 'Address'],
      ['addressLine2', 'Second line'],
      ['mapQuery', 'Place to show on the map', 'What you’d type into Google Maps to find the workshop.'],
    ],
  },
  {
    title: 'Social media',
    hint: 'Full links. Leave one blank to hide its icon.',
    fields: [
      ['facebook', 'Facebook'],
      ['instagram', 'Instagram'],
      ['tiktok', 'TikTok'],
      ['linkedin', 'LinkedIn'],
    ],
  },
  {
    title: 'Book a presentation',
    fields: [['calendlyUrl', 'Calendly link', 'The booking calendar shown on the Book a Presentation page.']],
  },
];

export default function SettingsAdmin() {
  const [values, setValues] = useState<SiteSettings | null>(null);
  const [saved, setSaved] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'contact')
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) return setError(error.message);
        const v = { ...DEFAULT_SETTINGS, ...(data?.value ?? {}) };
        setValues(v);
        setSaved(v);
      });
  }, []);

  const dirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(saved), [values, saved]);

  const save = async () => {
    if (!values) return;
    setSaving(true);
    setError(null);
    const clean = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, String(v).trim()])) as unknown as SiteSettings;
    const { error } = await supabase.from('site_settings').upsert({ key: 'contact', value: clean });
    setSaving(false);
    if (error) return setError(error.message);
    setValues(clean);
    setSaved(clean);
    setNotice(true);
    refreshContent();
  };

  return (
    <AdminLayout
      title="Contact details"
      actions={
        <Btn onClick={save} disabled={!dirty || saving}>
          {saving ? 'Saving…' : 'Save'}
        </Btn>
      }
    >
      <div className="max-w-2xl space-y-5">
        {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</p>}
        {notice && !dirty && (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800">
            Saved. The website is updated.
          </p>
        )}
        {!values && !error && <p className="py-16 text-center text-[13px] text-gray-400">Loading…</p>}
        {values &&
          FIELDS.map((group) => (
            <div key={group.title} className={`${card} p-5`}>
              <FormSection title={group.title} hint={group.hint}>
                {group.fields.map(([key, label, hint]) => (
                  <Field key={key} label={label} hint={hint}>
                    <TextInput
                      value={values[key]}
                      onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                      type={key === 'email' ? 'email' : 'text'}
                    />
                  </Field>
                ))}
              </FormSection>
            </div>
          ))}
      </div>
    </AdminLayout>
  );
}
