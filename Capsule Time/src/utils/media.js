import { supabase } from './supabaseClient.js';

const SIGNED_URL_TTL = 60 * 60 * 24; // 24 hours

function isPublicUrl(pathOrUrl) {
  return typeof pathOrUrl === 'string' && /^https?:\/\//.test(pathOrUrl);
}

export async function getSignedMediaUrl(pathOrUrl) {
  if (!pathOrUrl) return null;
  if (isPublicUrl(pathOrUrl)) return pathOrUrl;

  try {
    const { data, error } = await supabase.storage
      .from('capsule-media')
      .createSignedUrl(pathOrUrl, SIGNED_URL_TTL);

    if (error) {
      console.warn('[media] Failed to create signed URL', error);
      return null;
    }

    return data?.signedUrl ?? null;
  } catch (error) {
    console.warn('[media] Unexpected error creating signed URL', error);
    return null;
  }
}
