import { supabase } from '../utils/supabaseClient.js';
import { createCapsuleCard } from '../components/CapsuleCard.js';
import { createCountdownTimer } from '../components/CountdownTimer.js';
import { showToast, setLoading, formatError } from '../utils/ui.js';
import { getSignedMediaUrl } from '../utils/media.js';

const state = {
  session: null,
};

const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const createLink = document.getElementById('create-link');
const capsuleGrid = document.getElementById('capsule-grid');
const emptyState = document.getElementById('empty-state');
const userEmailDisplay = document.getElementById('user-email');
const loginSubmit = document.getElementById('login-submit');

async function init() {
  await restoreSession();
  supabase.auth.onAuthStateChange((_event, session) => {
    if (!session) {
      resetState();
      return;
    }
    state.session = session;
    enterDashboard();
  });
}

async function restoreSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    state.session = session;
    await enterDashboard();
  } else {
    toggleAuth(true);
  }
}

function resetState() {
  state.session = null;
  capsuleGrid.innerHTML = '';
  userEmailDisplay.textContent = '';
  toggleAuth(true);
}

function toggleAuth(showAuth) {
  if (showAuth) {
    authSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    createLink?.classList.add('hidden');
    logoutButton?.classList.add('hidden');
  } else {
    authSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    createLink?.classList.remove('hidden');
    logoutButton?.classList.remove('hidden');
  }
}

async function enterDashboard() {
  toggleAuth(false);
  userEmailDisplay.textContent = state.session.user.email;
  await loadCapsules();
}

async function loadCapsules() {
  capsuleGrid.innerHTML = '';
  emptyState.classList.add('hidden');

  const { data, error } = await supabase
    .from('capsules')
    .select('*')
    .eq('user_id', state.session.user.id)
    .order('unlock_at', { ascending: true });

  if (error) {
    console.error(error);
    showToast(`Gagal memuat kapsul: ${formatError(error)}`, 'error');
    return;
  }

  if (!data || data.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  const now = new Date();

  for (const capsule of data) {
    const unlockDate = capsule.unlock_at ? new Date(capsule.unlock_at) : null;
    const isUnlocked = unlockDate ? unlockDate <= now : true;
    const mediaUrl = await getSignedMediaUrl(capsule.media_url);
    const card = createCapsuleCard(
      {
        ...capsule,
        is_opened: capsule.is_opened || isUnlocked,
        media_url: mediaUrl,
      },
      {
        onOpen: handleOpenCapsule,
      }
    );

    if (unlockDate && !isUnlocked) {
      const timer = createCountdownTimer(unlockDate);
      card.appendChild(timer);
    }
    capsuleGrid.appendChild(card);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  if (!email || !password) {
    showToast('Email dan kata sandi wajib diisi.', 'error');
    return;
  }

  setLoading(loginSubmit, true, 'Masuk...');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  setLoading(loginSubmit, false);

  if (error) {
    showToast(formatError(error), 'error');
    return;
  }

  state.session = data.session;
  showToast('Berhasil masuk. Selamat datang kembali!', 'success');
  await enterDashboard();
}

async function handleLogout() {
  await supabase.auth.signOut();
  resetState();
  showToast('Berhasil keluar.', 'success');
}

function handleOpenCapsule(capsule) {
  window.location.href = `./capsule-detail.html?id=${encodeURIComponent(capsule.id)}`;
}

loginForm?.addEventListener('submit', handleLogin);
logoutButton?.addEventListener('click', handleLogout);

init();
