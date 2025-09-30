import { supabase } from '../utils/supabaseClient.js';
import { showToast, setLoading, formatError } from '../utils/ui.js';
import { formatDistanceToNow } from '../utils/timeUtils.js';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const form = document.getElementById('capsule-form');
const submitButton = document.getElementById('submit-button');
const logoutButton = document.getElementById('logout-button');
const countdownPreview = document.getElementById('countdown-preview');
const unlockDateInput = document.getElementById('unlock_date');
const unlockTimeInput = document.getElementById('unlock_time');

let session = null;

async function init() {
  const {
    data: { session: currentSession },
  } = await supabase.auth.getSession();

  if (!currentSession) {
    showToast('Harap masuk terlebih dahulu.', 'error');
    setTimeout(() => {
      window.location.href = './dashboard.html';
    }, 1500);
    return;
  }

  session = currentSession;
  logoutButton?.classList.remove('hidden');
  logoutButton?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = './dashboard.html';
  });

  presetUnlockFields();
  updateCountdownPreview();
}

function presetUnlockFields() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10);

  unlockDateInput.value = now.toISOString().slice(0, 10);
  unlockTimeInput.value = now.toISOString().slice(11, 16);
}

function updateCountdownPreview() {
  const unlockAt = buildUnlockDate();
  if (!unlockAt) {
    countdownPreview.textContent = '';
    return;
  }

  const now = new Date();
  if (unlockAt <= now) {
    countdownPreview.textContent = 'Tanggal harus berada di masa depan.';
    return;
  }

  countdownPreview.textContent = `Kapsul akan terbuka dalam ${formatDistanceToNow(unlockAt)}.`;
}

function buildUnlockDate() {
  const date = unlockDateInput.value;
  const time = unlockTimeInput.value;
  if (!date || !time) return null;
  const combined = new Date(`${date}T${time}:00`);
  if (Number.isNaN(combined.getTime())) {
    return null;
  }
  return combined;
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!session) return;

  const formData = new FormData(form);
  const title = formData.get('title')?.toString().trim();
  const content = formData.get('content')?.toString().trim();
  const mode = formData.get('mode');
  const unlockAt = buildUnlockDate();
  const file = form.media.files?.[0] ?? null;

  if (!unlockAt) {
    showToast('Tanggal buka tidak valid.', 'error');
    return;
  }

  if (unlockAt <= new Date()) {
    showToast('Pilih tanggal dan waktu di masa depan.', 'error');
    return;
  }

  if (!content && !file) {
    showToast('Isi pesan teks atau unggah media.', 'error');
    return;
  }

  if (file && file.size > MAX_FILE_SIZE) {
    showToast('Ukuran file melebihi 5MB.', 'error');
    return;
  }

  setLoading(submitButton, true, 'Menyimpan...');

  let mediaPath = null;
  let mediaType = null;

  if (file) {
    const storagePath = `${session.user.id}/${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('capsule-media')
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      setLoading(submitButton, false);
      showToast(`Gagal mengunggah media: ${formatError(uploadError)}`, 'error');
      return;
    }

    mediaPath = storagePath;
    mediaType = file.type;
  }

  const payload = {
    user_id: session.user.id,
    title: title || null,
    content_text: content || null,
    mode,
    unlock_at: unlockAt.toISOString(),
    is_opened: false,
    shared_token: mode === 'shared' ? crypto.randomUUID() : null,
    media_url: mediaPath,
    media_type: mediaType,
  };

  const { data, error } = await supabase.from('capsules').insert(payload).select().single();
  setLoading(submitButton, false);

  if (error) {
    showToast(`Gagal menyimpan kapsul: ${formatError(error)}`, 'error');
    return;
  }

  showToast('Kapsul berhasil dibuat!', 'success');
  setTimeout(() => {
    window.location.href = `./capsule-detail.html?id=${encodeURIComponent(data.id)}`;
  }, 800);
}

form?.addEventListener('submit', handleSubmit);
unlockDateInput?.addEventListener('change', updateCountdownPreview);
unlockTimeInput?.addEventListener('change', updateCountdownPreview);

init();
