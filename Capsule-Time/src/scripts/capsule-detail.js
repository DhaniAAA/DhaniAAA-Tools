import { supabase } from '../utils/supabaseClient.js';
import { createCountdownTimer } from '../components/CountdownTimer.js';
import { createReactionButtons } from '../components/ReactionButtons.js';
import { createOpeningAnimation } from '../components/OpeningAnimation.js';
import { showToast, formatError } from '../utils/ui.js';
import { formatDateTimeDisplay } from '../utils/timeUtils.js';
import { getSignedMediaUrl } from '../utils/media.js';

const params = new URLSearchParams(window.location.search);
const capsuleId = params.get('id');
const sharedToken = params.get('token');

const titleEl = document.getElementById('capsule-title');
const ownerEl = document.getElementById('capsule-owner');
const unlockEl = document.getElementById('capsule-unlock');
const contentEl = document.getElementById('capsule-content');
const mediaSection = document.getElementById('media-section');
const mediaWrapper = document.getElementById('media-wrapper');
const reactionSection = document.getElementById('reaction-section');
const reactionButtonsEl = document.getElementById('reaction-buttons');
const countdownWrapper = document.getElementById('countdown-wrapper');
const animationContainer = document.getElementById('open-animation');

let capsule = null;
let session = null;

async function init() {
  if (!capsuleId && !sharedToken) {
    showToast('ID kapsul atau token tidak ditemukan.', 'error');
    return;
  }

  const {
    data: { session: currentSession },
  } = await supabase.auth.getSession();

  session = currentSession;
  await loadCapsule();
}

async function loadCapsule() {
  titleEl.textContent = 'Memuat...';
  const query = supabase.from('capsules').select('*, users(username, avatar_url)');

  if (sharedToken) {
    query.eq('shared_token', sharedToken);
  } else {
    query.eq('id', capsuleId);
  }

  const { data, error } = await query.maybeSingle();

  if (error || !data) {
    console.error(error);
    showToast('Gagal memuat kapsul.', 'error');
    titleEl.textContent = 'Kapsul tidak ditemukan';
    return;
  }

  capsule = data;
  renderCapsule();
}

async function renderCapsule() {
  clearSections();

  if (!enforceAccess()) {
    return;
  }

  titleEl.textContent = capsule.title ?? 'Kapsul Tanpa Judul';
  ownerEl.textContent = capsule.users?.username ?? 'Anonim';
  unlockEl.textContent = formatDateTimeDisplay(capsule.unlock_at);

  const now = new Date();
  const unlockDate = new Date(capsule.unlock_at);
  const isUnlocked = capsule.is_opened || now >= unlockDate;

  if (!isUnlocked) {
    const timer = createCountdownTimer(unlockDate, {
      onElapsed: () => window.location.reload(),
    });
    countdownWrapper.appendChild(timer);
    reactionSection.classList.add('hidden');
    contentEl.innerHTML = '<p class="text-slate-300">Kapsul ini belum waktunya dibuka. Tunggu hingga countdown selesai.</p>';
    return;
  }

  // Create "opened" badge
  const openedBadge = document.createElement('div');
  openedBadge.className = 'inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm';
  openedBadge.innerHTML = '<span class="text-lg">✅</span><span class="text-sm font-semibold text-green-200">Kapsul telah dibuka</span>';
  countdownWrapper.appendChild(openedBadge);

  if (capsule.content_text) {
    const text = document.createElement('p');
    text.className = 'text-base leading-relaxed text-slate-200 whitespace-pre-line';
    text.textContent = capsule.content_text;
    contentEl.appendChild(text);
  }

  if (capsule.media_url) {
    const signedUrl = await getSignedMediaUrl(capsule.media_url);
    if (signedUrl) {
      mediaSection.classList.remove('hidden');
      if (capsule.media_type?.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = signedUrl;
        img.alt = capsule.title ?? 'Media kapsul';
        img.className = 'w-full rounded-2xl border border-white/10';
        mediaWrapper.appendChild(img);
      } else if (capsule.media_type?.startsWith('audio/')) {
        const audio = document.createElement('audio');
        audio.src = signedUrl;
        audio.controls = true;
        audio.className = 'w-full';
        mediaWrapper.appendChild(audio);
      }
    }
  }

  animationContainer.classList.remove('hidden');
  animationContainer.appendChild(createOpeningAnimation());

  reactionSection.classList.remove('hidden');
  reactionButtonsEl.appendChild(
    createReactionButtons({
      disabled: !session,
      onReact: (emoji) => submitReaction(emoji),
    })
  );
}

async function submitReaction(emoji) {
  if (!session) {
    showToast('Masuk untuk memberikan reaksi.', 'error');
    return;
  }

  const payload = {
    capsule_id: capsule.id,
    user_id: session.user.id,
    reaction_type: emoji,
  };

  const { error } = await supabase.from('reactions').insert(payload);
  if (error) {
    showToast(formatError(error), 'error');
    return;
  }

  showToast('Reaksi terkirim!', 'success');
}

function clearSections() {
  contentEl.innerHTML = '';
  mediaWrapper.innerHTML = '';
  mediaSection.classList.add('hidden');
  reactionSection.classList.add('hidden');
  countdownWrapper.innerHTML = '';
  animationContainer.innerHTML = '';
  animationContainer.classList.add('hidden');
}

function enforceAccess() {
  const userId = session?.user?.id;

  if (!capsule) {
    contentEl.innerHTML = '<p class="text-slate-300">Kapsul tidak ditemukan.</p>';
    return false;
  }

  if (capsule.mode === 'private' && userId !== capsule.user_id) {
    showToast('Kapsul ini bersifat privat. Masuk sebagai pemilik untuk melihatnya.', 'error');
    contentEl.innerHTML = '<p class="text-slate-300">Kapsul ini hanya dapat dibuka oleh pemiliknya.</p>';
    return false;
  }

  if (capsule.mode === 'shared') {
    const isOwner = userId === capsule.user_id;
    const hasValidToken = sharedToken && sharedToken === capsule.shared_token;
    if (!isOwner && !hasValidToken) {
      showToast('Kapsul ini hanya dapat diakses melalui tautan khusus.', 'error');
      contentEl.innerHTML = '<p class="text-slate-300">Gunakan tautan berbagi yang benar untuk membuka kapsul ini.</p>';
      return false;
    }
  }

  if (capsule.mode === 'public') {
    return true;
  }

  return true;
}

init();
