import { supabase } from '../utils/supabaseClient.js';
import { createCapsuleCard } from '../components/CapsuleCard.js';
import { showToast, formatError } from '../utils/ui.js';
import { getSignedMediaUrl } from '../utils/media.js';

const feedEl = document.getElementById('public-feed');
const skeletonTemplate = document.getElementById('skeleton-card-template');

async function init() {
  renderSkeletons();
  await loadPublicCapsules();
}

function renderSkeletons(count = 6) {
  feedEl.innerHTML = '';
  for (let i = 0; i < count; i += 1) {
    const clone = skeletonTemplate.content.cloneNode(true);
    feedEl.appendChild(clone);
  }
}

async function loadPublicCapsules() {
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from('capsules')
    .select('*')
    .eq('mode', 'public')
    .lte('unlock_at', nowIso)
    .order('unlock_at', { ascending: false })
    .limit(24);

  if (error) {
    console.error(error);
    showToast(`Gagal memuat feed publik: ${formatError(error)}`, 'error');
    return;
  }

  feedEl.innerHTML = '';

  if (!data || data.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'text-center text-slate-400';
    empty.textContent = 'Belum ada kapsul publik yang terbuka. Coba lagi nanti.';
    feedEl.appendChild(empty);
    return;
  }

  for (const capsule of data) {
    const mediaUrl = await getSignedMediaUrl(capsule.media_url);
    const card = createCapsuleCard(
      {
        ...capsule,
        is_opened: true,
        media_url: mediaUrl,
      },
      {
        onOpen: () => handleOpenCapsule(capsule),
        onReact: (capsuleData, emoji) => handleReact(capsuleData, emoji),
      }
    );

    feedEl.appendChild(card);
  }
}

function handleOpenCapsule(capsule) {
  window.location.href = `./capsule-detail.html?id=${encodeURIComponent(capsule.id)}`;
}

async function handleReact(capsule, emoji) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    showToast('Masuk terlebih dahulu untuk memberi reaksi.', 'error');
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

init();
