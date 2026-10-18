import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { refreshContent, type GalleryImage, type ProjectRow } from '../../../lib/cms';
import AdminLayout from '../AdminLayout';
import ImageUpload, { uploadImage } from '../ImageUpload';
import { Btn, Field, FormSection, Select, TextArea, TextInput, Toggle, card } from '../ui';

type Draft = Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>;

const EMPTY: Draft = {
  slug: '',
  name: '',
  location: '',
  map_query: '',
  category: '',
  year: String(new Date().getFullYear()),
  status: 'Completed',
  project_type: '',
  scope: '',
  description: '',
  cover_image: '',
  cover_alt: '',
  cover_position: '',
  gallery: [],
  featured: false,
  dark_header: false,
  sort_order: 0,
  published: true,
  seo_title: '',
  seo_description: '',
  old_slugs: [],
};

const POSITIONS: [string, string][] = [
  ['', 'Top'],
  ['center 30%', 'Upper third'],
  ['center', 'Middle'],
  ['center 70%', 'Lower third'],
  ['bottom', 'Bottom'],
];

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

function Counter({ value, max }: { value: string; max: number }) {
  return (
    <span className={`text-[11px] ${value.length > max ? 'text-amber-600' : 'text-gray-400'}`}>
      {value.length}/{max}
    </span>
  );
}

export default function ProjectEditor() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [saved, setSaved] = useState<Draft | null>(isNew ? EMPTY : null);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [uploading, setUploading] = useState(0);
  const galleryInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase
      .from('site_projects')
      .select('category')
      .then(({ data }) => setCategories(Array.from(new Set((data ?? []).map((r) => r.category).filter(Boolean)))));
    if (isNew) return;
    supabase
      .from('site_projects')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) return setError(error.message);
        if (!data) return setError('This project no longer exists.');
        const row: Partial<ProjectRow> = { ...(data as ProjectRow) };
        delete row.id;
        delete row.created_at;
        delete row.updated_at;
        const loaded = { ...EMPTY, ...row, gallery: row.gallery ?? [] } as Draft;
        setDraft(loaded);
        setSaved(loaded);
      });
  }, [id, isNew]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  const setName = (name: string) =>
    setDraft((d) => ({ ...d, name, slug: slugTouched ? d.slug : slugify(name) }));

  const setGallery = (fn: (g: GalleryImage[]) => GalleryImage[]) => setDraft((d) => ({ ...d, gallery: fn(d.gallery ?? []) }));

  const addPhotos = async (files: FileList) => {
    setError(null);
    const list = Array.from(files);
    setUploading((n) => n + list.length);
    for (const file of list) {
      try {
        const src = await uploadImage(file, 'projects');
        setGallery((g) => [...g, { src, caption: '', alt: '' }]);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Upload failed.');
      } finally {
        setUploading((n) => n - 1);
      }
    }
  };

  const moveImage = (i: number, dir: -1 | 1) =>
    setGallery((g) => {
      const j = i + dir;
      if (j < 0 || j >= g.length) return g;
      const next = [...g];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const save = async () => {
    setError(null);
    setNotice(null);
    if (!draft.name.trim()) return setError('Add a project name.');
    const slug = slugify(draft.slug || draft.name);
    if (!slug) return setError('Add a web address for the project.');

    // Keep the old address so links to it can be redirected.
    const oldSlugs = new Set(draft.old_slugs ?? []);
    if (saved && saved.slug && saved.slug !== slug) oldSlugs.add(saved.slug);
    oldSlugs.delete(slug);

    const row = {
      ...draft,
      slug,
      name: draft.name.trim(),
      old_slugs: Array.from(oldSlugs),
      gallery: (draft.gallery ?? []).filter((g) => g.src),
    };

    setSaving(true);
    let res;
    if (isNew) {
      const { data: last } = await supabase
        .from('site_projects')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle();
      res = await supabase
        .from('site_projects')
        .insert({ ...row, sort_order: (last?.sort_order ?? 0) + 10 })
        .select('id')
        .single();
      // A project added by hand means the admin list is now the source of truth.
      const { data: cms } = await supabase.from('site_settings').select('value').eq('key', 'cms').maybeSingle();
      await supabase.from('site_settings').upsert({ key: 'cms', value: { ...(cms?.value ?? {}), projectsSeeded: true } });
    } else {
      res = await supabase.from('site_projects').update(row).eq('id', id).select('id').single();
    }
    setSaving(false);

    if (res.error) {
      return setError(
        res.error.code === '23505'
          ? 'Another project already uses this web address. Change it under “Web address”.'
          : res.error.message,
      );
    }
    refreshContent();
    setDraft(row);
    setSaved(row);
    setSlugTouched(true);
    setNotice('Saved. The website is updated.');
    if (isNew) navigate(`/admin/projects/${res.data.id}`, { replace: true });
  };

  const remove = async () => {
    if (!window.confirm(`Delete “${draft.name}”? This can’t be undone. To take it off the website for now, turn off “Show on website” instead.`)) return;
    const { error } = await supabase.from('site_projects').delete().eq('id', id);
    if (error) return setError(error.message);
    refreshContent();
    navigate('/admin/projects', { replace: true });
  };

  const loading = !isNew && saved === null && !error;
  const seoTitle = draft.seo_title || `${draft.name || 'Project name'} - ${draft.location || 'Location'} | HULMA Project Portfolio`;
  const seoDesc = draft.seo_description || draft.description || 'Project description…';

  return (
    <AdminLayout
      title={isNew ? 'New project' : draft.name || 'Project'}
      back="/admin/projects"
      actions={
        <>
          {!isNew && saved?.published && (
            <a
              href={`/project/${saved.slug}`}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-xl px-3 py-2 text-[13px] font-semibold text-gray-500 hover:bg-white/60 hover:text-gray-800 sm:block"
            >
              View on site
            </a>
          )}
          <Btn onClick={save} disabled={saving || uploading > 0 || (!dirty && !isNew)}>
            {saving ? 'Saving…' : uploading > 0 ? 'Uploading…' : 'Save'}
          </Btn>
        </>
      }
    >
      {loading ? (
        <p className="py-16 text-center text-[13px] text-gray-400">Loading…</p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            {error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</p>
            )}
            {notice && !dirty && (
              <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] text-emerald-800">
                {notice}
              </p>
            )}

            <div className={`${card} space-y-4 p-5`}>
              <FormSection title="Project">
                <Field label="Name">
                  <TextInput value={draft.name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Crown Regency Hotel Lobby" />
                </Field>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Category" hint="Pick one or type a new one.">
                    <TextInput
                      value={draft.category ?? ''}
                      onChange={(e) => set('category', e.target.value)}
                      list="project-categories"
                      placeholder="Hospitality"
                    />
                    <datalist id="project-categories">
                      {categories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </Field>
                  <Field label="Location">
                    <TextInput value={draft.location ?? ''} onChange={(e) => set('location', e.target.value)} placeholder="Cebu City" />
                  </Field>
                  <Field label="Year">
                    <TextInput value={draft.year ?? ''} onChange={(e) => set('year', e.target.value)} />
                  </Field>
                  <Field label="Status">
                    <Select value={draft.status ?? ''} onChange={(e) => set('status', e.target.value)}>
                      <option>Completed</option>
                      <option>Ongoing</option>
                    </Select>
                  </Field>
                  <Field label="Project type" hint="e.g. Design / Fabrication / Installation">
                    <TextInput value={draft.project_type ?? ''} onChange={(e) => set('project_type', e.target.value)} />
                  </Field>
                  <Field label="Scope" hint="e.g. Fiberglass Columns / Wall Panels">
                    <TextInput value={draft.scope ?? ''} onChange={(e) => set('scope', e.target.value)} />
                  </Field>
                </div>
                <Field label="Description">
                  <TextArea rows={6} value={draft.description ?? ''} onChange={(e) => set('description', e.target.value)} />
                </Field>
              </FormSection>
            </div>

            <div className={`${card} space-y-4 p-5`}>
              <FormSection title="Photo gallery" hint="Shown on the project page. Drag photos in or pick several at once.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(draft.gallery ?? []).map((img, i) => (
                    <div key={img.src + i} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <div className="relative aspect-[16/10] bg-gray-100">
                        <img src={img.src} alt="" className="h-full w-full object-cover" />
                        <div className="absolute right-2 top-2 flex gap-1">
                          <button
                            type="button"
                            onClick={() => moveImage(i, -1)}
                            disabled={i === 0}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 disabled:opacity-30"
                            aria-label="Move earlier"
                          >
                            <i className="ri-arrow-left-s-line" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveImage(i, 1)}
                            disabled={i === (draft.gallery ?? []).length - 1}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75 disabled:opacity-30"
                            aria-label="Move later"
                          >
                            <i className="ri-arrow-right-s-line" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setGallery((g) => g.filter((_, k) => k !== i))}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white hover:bg-red-600"
                            aria-label="Remove photo"
                          >
                            <i className="ri-close-line" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2 p-2.5">
                        <input
                          value={img.caption ?? ''}
                          onChange={(e) => setGallery((g) => g.map((x, k) => (k === i ? { ...x, caption: e.target.value } : x)))}
                          placeholder="Caption, e.g. Lobby entrance"
                          className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-[13px] outline-none focus:border-[#3F443F]"
                        />
                        <input
                          value={img.alt ?? ''}
                          onChange={(e) => setGallery((g) => g.map((x, k) => (k === i ? { ...x, alt: e.target.value } : x)))}
                          placeholder="Describe the photo for Google (optional)"
                          className="w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-[12px] text-gray-600 outline-none focus:border-[#3F443F]"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => galleryInput.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files.length) addPhotos(e.dataTransfer.files);
                    }}
                    className="flex aspect-[16/10] flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300"
                  >
                    <i className={uploading ? 'ri-loader-4-line animate-spin text-xl' : 'ri-image-add-line text-xl'} />
                    <span className="text-[13px] font-medium">
                      {uploading ? `Uploading ${uploading}…` : 'Add photos'}
                    </span>
                  </button>
                </div>
                <input
                  ref={galleryInput}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) addPhotos(e.target.files);
                    e.target.value = '';
                  }}
                />
              </FormSection>
            </div>

            <div className={`${card} space-y-4 p-5`}>
              <FormSection title="Google search" hint="Leave blank to use the project name and description.">
                <div className="rounded-xl border border-gray-100 bg-white p-3.5">
                  <p className="truncate text-[12px] text-gray-500">
                    hulmacebu.com › project › {slugify(draft.slug || draft.name) || '…'}
                  </p>
                  <p className="truncate text-[17px] leading-snug text-[#1a0dab]">{seoTitle}</p>
                  <p className="line-clamp-2 text-[13px] text-gray-600">{seoDesc}</p>
                </div>
                <Field label="Title in Google">
                  <TextInput value={draft.seo_title ?? ''} onChange={(e) => set('seo_title', e.target.value)} />
                  <Counter value={draft.seo_title ?? ''} max={60} />
                </Field>
                <Field label="Description in Google">
                  <TextArea rows={2} value={draft.seo_description ?? ''} onChange={(e) => set('seo_description', e.target.value)} />
                  <Counter value={draft.seo_description ?? ''} max={155} />
                </Field>
                <Field label="Web address" hint="Changing it keeps the old address working.">
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white pl-3 focus-within:border-[#3F443F]">
                    <span className="text-[13px] text-gray-400">hulmacebu.com/project/</span>
                    <input
                      value={draft.slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        set('slug', e.target.value);
                      }}
                      onBlur={() => set('slug', slugify(draft.slug))}
                      className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm outline-none"
                    />
                  </div>
                </Field>
              </FormSection>
            </div>
          </div>

          <div className="space-y-5">
            <div className={`${card} space-y-4 p-5`}>
              <FormSection title="On the website">
                <Toggle checked={draft.published} onChange={(v) => set('published', v)} label="Show on website" />
                <Toggle checked={draft.featured} onChange={(v) => set('featured', v)} label="Featured" />
                <p className="-mt-1 text-[11px] text-gray-400">Featured projects appear in the menu and lead the homepage.</p>
              </FormSection>
            </div>

            <div className={`${card} space-y-4 p-5`}>
              <FormSection title="Cover photo">
                <ImageUpload value={draft.cover_image ?? ''} onChange={(v) => set('cover_image', v)} folder="projects" />
                <Field label="Which part of the photo to keep in view">
                  <Select value={draft.cover_position ?? ''} onChange={(e) => set('cover_position', e.target.value)}>
                    {POSITIONS.map(([v, l]) => (
                      <option key={l} value={v}>
                        {l}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Describe the photo" hint="Read by Google and screen readers.">
                  <TextInput value={draft.cover_alt ?? ''} onChange={(e) => set('cover_alt', e.target.value)} />
                </Field>
                <Toggle checked={draft.dark_header} onChange={(v) => set('dark_header', v)} label="Dark menu text" />
                <p className="-mt-1 text-[11px] text-gray-400">Turn on if the top of the cover photo is light.</p>
              </FormSection>
            </div>

            <div className={`${card} space-y-4 p-5`}>
              <FormSection title="Map">
                <Field label="Place to show on the map" hint="What you’d type into Google Maps. Leave blank to use the location.">
                  <TextInput value={draft.map_query ?? ''} onChange={(e) => set('map_query', e.target.value)} />
                </Field>
              </FormSection>
            </div>

            {!isNew && (
              <button
                onClick={remove}
                className="w-full rounded-xl border border-red-200 bg-white/60 px-4 py-2.5 text-[13px] font-semibold text-red-600 hover:bg-red-50"
              >
                Delete project
              </button>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
