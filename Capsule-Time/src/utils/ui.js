const TOAST_DURATION = 4000;

function ensureToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

export function showToast(message, type = 'info') {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast';

  if (type === 'success') {
    toast.style.borderColor = 'rgba(34, 197, 94, 0.6)';
    toast.style.color = 'rgba(220, 252, 231, 0.95)';
  }

  if (type === 'error') {
    toast.style.borderColor = 'rgba(248, 113, 113, 0.6)';
    toast.style.color = 'rgba(254, 226, 226, 0.95)';
  }

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2', 'transition');
  }, TOAST_DURATION - 500);

  setTimeout(() => {
    toast.remove();
  }, TOAST_DURATION);
}

export function setLoading(button, loading = true, loadingText = 'Memuat...') {
  if (!button) return;
  if (loading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText || button.textContent;
    button.disabled = false;
  }
}

export function formatError(error) {
  if (!error) return 'Terjadi kesalahan yang tidak diketahui.';
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  return JSON.stringify(error);
}
