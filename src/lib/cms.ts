// Website content managed in /admin. The public site reads it through the hooks
// below. Until the database answers (or if it can't be reached) pages show the
// last copy this browser saw, or the built-in content from src/mocks, so a
// visitor never gets an empty page.
import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { projects as builtInProjects } from '../mocks/projects';

// ---------------------------------------------------------------- types

export interface GalleryImage {
  src: string;
  caption?: string;
  alt?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  mapQuery: string;
  category: string;
  year: string;
  status: string;
  projectType: string;
  scope: string;
  description: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the cover, e.g. 'center 30%'. */
  imagePosition: string;
  gallery: GalleryImage[];
  featured: boolean;
  darkHeader: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface SiteSettings {
  email: string;
  phone: string;
  hours: string;
  address: string;
  addressLine2: string;
  /** What Google Maps should search for (map embed + "Get directions"). */
  mapQuery: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  calendlyUrl: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  email: 'hulmacebu@gmail.com',
  phone: '+63 912 345 6789',
  hours: 'Mon – Sat: 10:00 AM – 5:00 PM',
  address: 'Consolacion, Cebu City',
  addressLine2: 'Philippines',
  mapQuery: 'Consolacion, Cebu, Philippines',
  facebook: 'https://www.facebook.com/hulmacebu/',
  instagram: 'https://www.instagram.com/hulmafiberglasscebu/',
  tiktok: 'https://www.tiktok.com/@hulmacebu',
  linkedin: 'https://www.linkedin.com/company/hulmafiberglasscebu',
  calendlyUrl: 'https://calendly.com/hulmacebu/30min',
};

// ---------------------------------------------------------------- row mapping

export interface ProjectRow {
  id: string;
  slug: string;
  name: string;
  location: string | null;
  map_query: string | null;
  category: string | null;
  year: string | null;
  status: string | null;
  project_type: string | null;
  scope: string | null;
  description: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  cover_position: string | null;
  gallery: GalleryImage[] | null;
  featured: boolean;
  dark_header: boolean;
  sort_order: number;
  published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  old_slugs: string[];
  created_at?: string;
  updated_at?: string;
}

export const rowToProject = (r: ProjectRow): Project => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  location: r.location ?? '',
  mapQuery: r.map_query ?? '',
  category: r.category ?? '',
  year: r.year ?? '',
  status: r.status ?? '',
  projectType: r.project_type ?? '',
  scope: r.scope ?? '',
  description: r.description ?? '',
  image: r.cover_image ?? '',
  imageAlt: r.cover_alt ?? '',
  imagePosition: r.cover_position ?? '',
  gallery: r.gallery ?? [],
  featured: r.featured,
  darkHeader: r.dark_header,
  seoTitle: r.seo_title ?? '',
  seoDescription: r.seo_description ?? '',
});

// The original hard-coded projects, in the same shape. Also the starter rows
// for "Load current projects" in the admin.
const tailwindPosition = (cls?: string) =>
  cls?.match(/object-\[(.+)\]/)?.[1].replace(/_/g, ' ') ?? '';

export const BUILT_IN_PROJECTS: Project[] = builtInProjects.map((p, i) => ({
  id: `built-in-${p.id}`,
  slug: p.slug,
  name: p.name,
  location: p.location,
  mapQuery: p.mapQuery ?? '',
  category: p.category,
  year: p.year,
  status: p.status,
  projectType: p.projectType,
  scope: p.scope,
  description: p.description,
  image: p.image,
  imageAlt: '',
  imagePosition: tailwindPosition((p as { imagePosition?: string }).imagePosition),
  gallery: p.gallery,
  featured: i < 4,
  darkHeader: p.slug === 'city-hall-of-justice',
  seoTitle: '',
  seoDescription: '',
}));

export const projectToRow = (p: Project, sortOrder: number) => ({
  slug: p.slug,
  name: p.name,
  location: p.location || null,
  map_query: p.mapQuery || null,
  category: p.category || null,
  year: p.year || null,
  status: p.status || null,
  project_type: p.projectType || null,
  scope: p.scope || null,
  description: p.description || null,
  cover_image: p.image || null,
  cover_alt: p.imageAlt || null,
  cover_position: p.imagePosition || null,
  gallery: p.gallery,
  featured: p.featured,
  dark_header: p.darkHeader,
  sort_order: sortOrder,
  published: true,
  seo_title: p.seoTitle || null,
  seo_description: p.seoDescription || null,
});

// ---------------------------------------------------------------- store

interface Content {
  settings: SiteSettings;
  projects: Project[];
}

const CACHE_KEY = 'hulma-content-v1';
const TIMEOUT_MS = 8000;

const builtIn: Content = { settings: DEFAULT_SETTINGS, projects: BUILT_IN_PROJECTS };

function readCache(): Content | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Content) : null;
  } catch {
    return null;
  }
}

let current: Content = readCache() ?? builtIn;
let loaded = false;
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

const withTimeout = <T,>(p: PromiseLike<T>) =>
  Promise.race([p, new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS))]);

async function fetchContent(): Promise<Content | null> {
  try {
    const [settingsRes, projectsRes] = await withTimeout(
      Promise.all([
        supabase.from('site_settings').select('key, value'),
        supabase.from('site_projects').select('*').order('sort_order').order('created_at'),
      ]),
    );
    if (settingsRes.error || projectsRes.error) return null;

    const byKey = Object.fromEntries((settingsRes.data ?? []).map((r) => [r.key, r.value]));
    const settings: SiteSettings = { ...DEFAULT_SETTINGS, ...(byKey.contact ?? {}) };
    // Once projects have been loaded into the admin, the database is the
    // source of truth, even if every project is hidden.
    const seeded = Boolean(byKey.cms?.projectsSeeded);
    const projects = seeded ? (projectsRes.data as ProjectRow[]).map(rowToProject) : BUILT_IN_PROJECTS;
    return { settings, projects };
  } catch {
    return null;
  }
}

/** Fetch fresh content and notify every page using it. */
export function refreshContent(): Promise<void> {
  if (inflight) return inflight;
  inflight = fetchContent().then((next) => {
    inflight = null;
    loaded = true;
    if (!next) return;
    current = next;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(next));
    } catch {
      /* storage full or blocked: the in-memory copy still works */
    }
    listeners.forEach((fn) => fn());
  });
  return inflight;
}

function useContent(): { content: Content; ready: boolean } {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((t) => t + 1);
    listeners.add(fn);
    if (!loaded) refreshContent().then(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return { content: current, ready: loaded };
}

export function useSiteSettings(): SiteSettings {
  return useContent().content.settings;
}

/** `ready` turns true once the database has answered (or failed), so a page
 *  can wait before deciding a project doesn't exist. */
export function useProjects(): { projects: Project[]; ready: boolean } {
  const { content, ready } = useContent();
  return { projects: content.projects, ready };
}

/** Project categories in the order they first appear in the project list. */
export function useProjectCategories(): string[] {
  const { projects } = useProjects();
  return Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
}
