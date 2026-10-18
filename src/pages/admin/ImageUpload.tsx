import { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { compressImage } from '../../lib/compressImage';

const BUCKET = 'site-media';
const MAX_MB = 25;

/** Shrinks a photo in the browser, uploads it to the site-media bucket and returns its public URL. */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('That’s not an image file.');
  if (file.size > MAX_MB * 1024 * 1024) throw new Error(`Photo is over ${MAX_MB} MB. Pick a smaller one.`);
  const small = await compressImage(file, { maxEdge: 2400, quality: 0.85, type: 'image/webp', stripLocation: true });
  const ext = small.type === 'image/webp' ? 'webp' : small.type === 'image/png' ? 'png' : 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, small, { contentType: small.type, cacheControl: '31536000', upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Pick or drag a photo. Shows the current one with Replace / Remove. */
export default function ImageUpload({
  value,
  onChange,
  folder,
  aspect = 'aspect-[16/10]',
  hint,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  aspect?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);

  const upload = async (file: File) => {
    setErr(null);
    setBusy(true);
    try {
      onChange(await uploadImage(file, folder));
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) upload(f);
        }}
        className={`relative ${aspect} w-full overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          drag ? 'border-[#3F443F] bg-stone-50' : 'border-gray-200 bg-gray-50'
        }`}
      >
        {value ? (
          <>
            <img src={value} alt="" className="h-full w-full object-cover" />
            {busy && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              </div>
            )}
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75"
              aria-label="Remove photo"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-2 left-2 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-gray-700 shadow hover:bg-white"
            >
              Replace
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-gray-400"
          >
            {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" strokeWidth={1.5} />}
            <span className="text-[13px] font-medium">{busy ? 'Uploading…' : 'Upload a photo'}</span>
            <span className="text-[11px]">or drag one in</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = '';
        }}
      />
      {err && <p className="mt-1.5 text-[12px] text-red-600">{err}</p>}
      {hint && !err && <p className="mt-1.5 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}
