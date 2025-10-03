const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

function pad(value) {
  return value.toString().padStart(2, '0');
}

export function formatDistanceToNow(targetDate) {
  const now = new Date();
  const target = targetDate instanceof Date ? targetDate : new Date(targetDate);
  const diff = target.getTime() - now.getTime();

  if (Number.isNaN(target.getTime())) {
    return 'tanggal tidak valid';
  }

  if (diff <= 0) {
    return '0 detik';
  }

  const days = Math.floor(diff / DAY);
  const hours = Math.floor((diff % DAY) / HOUR);
  const minutes = Math.floor((diff % HOUR) / MINUTE);
  const seconds = Math.floor((diff % MINUTE) / SECOND);

  const parts = [];

  if (days > 0) {
    parts.push(`${days} hari`);
  }

  parts.push(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
  return parts.join(' ');
}

export function formatDateTimeDisplay(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return 'Tanggal tidak valid';
  }

  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

export function nowIso() {
  return new Date().toISOString();
}
