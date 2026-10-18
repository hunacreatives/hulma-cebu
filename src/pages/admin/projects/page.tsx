import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { BUILT_IN_PROJECTS, projectToRow, refreshContent, type ProjectRow } from '../../../lib/cms';
import AdminLayout from '../AdminLayout';
import { Btn, card } from '../ui';

// Kept between visits so coming back to the list is instant; refreshed in the background.
let listCache: ProjectRow[] | null = null;

async function markSeeded() {
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'cms').maybeSingle();
  await supabase.from('site_settings').upsert({ key: 'cms', value: { ...(data?.value ?? {}), projectsSeeded: true } });
}

export default function ProjectsAdmin() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ProjectRow[] | null>(listCache);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from('site_projects')
      .select('*')
      .order('sort_order')
      .order('created_at');
    if (error) return setError(error.message);
    listCache = data as ProjectRow[];
    setRows(listCache);
  };

  useEffect(() => {
    load();
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!rows || !q) return rows ?? [];
    return rows.filter((r) =>
      [r.name, r.location, r.category, r.year].some((v) => v?.toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const loadStarter = async () => {
    setBusy(true);
    setError(null);
    const { error } = await supabase
      .from('site_projects')
      .insert(BUILT_IN_PROJECTS.map((p, i) => projectToRow(p, (i + 1) * 10)));
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    await markSeeded();
    await load();
    await refreshContent();
    setBusy(false);
  };

  /** Swap a project with its neighbour in the full list. */
  const move = async (row: ProjectRow, dir: -1 | 1) => {
    if (!rows) return;
    const i = rows.findIndex((r) => r.id === row.id);
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    const renumbered = next.map((r, k) => ({ ...r, sort_order: (k + 1) * 10 }));
    listCache = renumbered;
    setRows(renumbered);
    const changed = renumbered.filter((r, k) => rows[k]?.id !== r.id || rows[k]?.sort_order !== r.sort_order);
    await Promise.all(
      changed.map((r) => supabase.from('site_projects').update({ sort_order: r.sort_order }).eq('id', r.id)),
    );
    refreshContent();
  };

  const searching = query.trim().length > 0;

  return (
    <AdminLayout
      title="Projects"
      actions={
        rows && rows.length > 0 ? (
          <Btn onClick={() => navigate('/admin/projects/new')}>
            <i className="ri-add-line text-base" /> Add project
          </Btn>
        ) : undefined
      }
    >
      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">{error}</p>
      )}

      {rows === null && !error && <p className="py-16 text-center text-[13px] text-gray-400">Loading…</p>}

      {rows && rows.length === 0 && (
        <div className={`${card} px-6 py-14 text-center`}>
          <p className="text-[15px] font-semibold text-gray-900">No projects in the admin yet</p>
          <p className="mx-auto mt-1.5 max-w-md text-[13px] text-gray-500">
            The website currently shows {BUILT_IN_PROJECTS.length} built-in projects. Load them here to edit them,
            or start from an empty list.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <Btn onClick={loadStarter} disabled={busy}>
              {busy ? 'Loading…' : `Load the ${BUILT_IN_PROJECTS.length} current projects`}
            </Btn>
            <Btn variant="outline" onClick={() => navigate('/admin/projects/new')}>
              Start empty
            </Btn>
          </div>
        </div>
      )}

      {rows && rows.length > 0 && (
        <>
          <div className="mb-4 flex items-center gap-3">
            <div className="relative max-w-sm flex-1">
              <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects"
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-[#3F443F]"
              />
            </div>
            <p className="text-[13px] text-gray-500">
              {shown.length} of {rows.length}
            </p>
          </div>

          <div className={`${card} overflow-hidden`}>
            {shown.map((r) => (
              <div
                key={r.id}
                className="group flex items-center gap-3 border-t border-gray-100 px-3 py-2.5 first:border-t-0 hover:bg-stone-50/70 sm:gap-4 sm:px-4"
              >
                {!searching && (
                  <div className="hidden flex-col sm:flex">
                    <button
                      onClick={() => move(r, -1)}
                      className="text-gray-300 hover:text-gray-700"
                      aria-label={`Move ${r.name} up`}
                    >
                      <i className="ri-arrow-up-s-line" />
                    </button>
                    <button
                      onClick={() => move(r, 1)}
                      className="text-gray-300 hover:text-gray-700"
                      aria-label={`Move ${r.name} down`}
                    >
                      <i className="ri-arrow-down-s-line" />
                    </button>
                  </div>
                )}
                <Link to={`/admin/projects/${r.id}`} className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                  <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {r.cover_image && (
                      <img
                        src={r.cover_image}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ objectPosition: r.cover_position || 'top' }}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium text-gray-900">{r.name}</p>
                    <p className="truncate text-[12px] text-gray-500">{r.location}</p>
                  </div>
                  <p className="hidden w-32 truncate text-[13px] text-gray-600 md:block">{r.category}</p>
                  <p className="hidden w-12 text-[13px] text-gray-600 md:block">{r.year}</p>
                  <div className="flex w-20 justify-end gap-1.5 sm:w-28">
                    {r.featured && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                        Featured
                      </span>
                    )}
                    {!r.published && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                        Hidden
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
            {shown.length === 0 && (
              <p className="px-4 py-10 text-center text-[13px] text-gray-400">No projects match “{query}”.</p>
            )}
          </div>
          {!searching && (
            <p className="mt-3 text-[12px] text-gray-400">
              The order here is the order on the website. Featured projects appear in the menu and lead the homepage.
            </p>
          )}
        </>
      )}
    </AdminLayout>
  );
}
