import { formatDistanceToNow } from '../utils/timeUtils.js';

export function createCountdownTimer(targetDate, { onElapsed } = {}) {
  const container = document.createElement('div');
  container.className = 'inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r';

  const icon = document.createElement('span');
  icon.className = 'text-lg';
  icon.textContent = '⏳';
  container.appendChild(icon);

  const text = document.createElement('span');
  text.className = 'text-sm font-bold text-amber-100 tabular-nums';
  container.appendChild(text);

  let timerId = null;

  function tick() {
    const now = new Date();
    const target = new Date(targetDate);
    if (Number.isNaN(target.getTime())) {
      text.textContent = 'Tanggal tidak valid';
      container.className = 'inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm';
      text.className = 'text-sm font-semibold text-red-200';
      clearInterval(timerId);
      return;
    }

    if (now >= target) {
      icon.textContent = '✅';
      text.textContent = 'Sudah waktunya!';
      container.className = 'inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm';
      text.className = 'text-sm font-semibold text-green-200';
      clearInterval(timerId);
      if (typeof onElapsed === 'function') {
        onElapsed();
      }
      return;
    }

    text.textContent = `Terbuka dalam ${formatDistanceToNow(target)}`;
  }

  tick();
  timerId = window.setInterval(tick, 1000); // Update setiap 1 detik untuk realtime countdown

  container.cleanup = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  return container;
}
