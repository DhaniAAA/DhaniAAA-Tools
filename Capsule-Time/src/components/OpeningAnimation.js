export function createOpeningAnimation() {
  const container = document.createElement('div');
  container.className = 'relative w-full max-w-xl mx-auto aspect-video flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur shadow-glow';

  const shard = document.createElement('div');
  shard.className = 'absolute inset-0 bg-gradient-to-br from-indigo-500/70 via-purple-500/60 to-fuchsia-600/50 mix-blend-screen animate-[shatter_1200ms_ease-out_forwards]';
  container.appendChild(shard);

  const light = document.createElement('div');
  light.className = 'absolute inset-0 opacity-0 animate-[flare_1400ms_ease-out_200ms_forwards] bg-[radial-gradient(circle_at_center,_rgba(240,246,255,0.95),_transparent_60%)]';
  container.appendChild(light);

  const text = document.createElement('div');
  text.className = 'relative z-10 text-center px-6';
  text.innerHTML = `
    <h2 class="text-3xl font-bold tracking-tight mb-3">Kapsul Terbuka!</h2>
    <p class="text-base text-indigo-100/90">Nikmati kembali pesan masa lalumu. Simpan perasaan ini dan bagikan jika kamu mau.</p>
  `;
  container.appendChild(text);

  const style = document.createElement('style');
  style.textContent = `
  @keyframes shatter {
    0% { transform: scale(1); clip-path: inset(0% 0% 0% 0%); opacity: 1; }
    30% { transform: scale(1.05); }
    70% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 1; }
    100% { transform: scale(1.2); clip-path: polygon(0 100%, 0 100%, 100% 100%, 100% 100%); opacity: 0; }
  }
  @keyframes flare {
    0% { opacity: 0; }
    40% { opacity: 0.7; }
    100% { opacity: 0; }
  }
  `;
  container.appendChild(style);

  return container;
}
