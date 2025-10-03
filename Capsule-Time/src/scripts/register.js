import { supabase } from '../utils/supabaseClient.js';
import { showToast, setLoading, formatError } from '../utils/ui.js';

const form = document.getElementById('register-form');
const submitButton = document.getElementById('register-submit');

async function handleRegister(event) {
  event.preventDefault();

  const email = form.email.value.trim();
  const password = form.password.value.trim();
  const username = form.username.value.trim();

  if (!email || !password || !username) {
    showToast('Isi semua data yang diperlukan.', 'error');
    return;
  }

  if (username.length < 3) {
    showToast('Nama pengguna minimal 3 karakter.', 'error');
    return;
  }

  setLoading(submitButton, true, 'Mendaftar...');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  setLoading(submitButton, false);

  if (error) {
    showToast(formatError(error), 'error');
    return;
  }

  if (data.user) {
    showToast('Pendaftaran berhasil, cek email untuk verifikasi.', 'success');
    setTimeout(() => {
      window.location.href = './dashboard.html';
    }, 1500);
  }
}

form?.addEventListener('submit', handleRegister);
