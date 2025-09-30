export function createCapsuleCard(capsule, { onOpen, onReact } = {}) {
  const card = document.createElement('article');
  card.className = 'group relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/20 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1';

  // Gradient overlay on hover
  const gradientOverlay = document.createElement('div');
  gradientOverlay.className = 'absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none';
  card.appendChild(gradientOverlay);

  // Content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'relative z-10 p-5 sm:p-6 space-y-4';

  // Header with title and badge
  const header = document.createElement('div');
  header.className = 'flex items-start justify-between gap-3';

  const titleSection = document.createElement('div');
  titleSection.className = 'flex-1 min-w-0 space-y-2';

  const title = document.createElement('h3');
  title.className = 'text-lg sm:text-xl font-bold text-white truncate group-hover:text-indigo-200 transition-colors';
  title.textContent = capsule.title ?? 'Kapsul Tanpa Judul';
  titleSection.appendChild(title);

  if (capsule.unlock_at) {
    const unlockInfo = document.createElement('div');
    unlockInfo.className = 'flex items-center gap-1.5 text-xs sm:text-sm text-slate-400';
    const unlockDate = new Date(capsule.unlock_at);
    const isUnlocked = capsule.is_opened || unlockDate <= new Date();
    
    const icon = document.createElement('span');
    icon.className = isUnlocked ? 'text-green-400' : 'text-amber-400';
    icon.textContent = isUnlocked ? '✅' : '🔒';
    unlockInfo.appendChild(icon);
    
    const dateText = document.createElement('span');
    dateText.textContent = isUnlocked ? 'Terbuka' : unlockDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    unlockInfo.appendChild(dateText);
    
    titleSection.appendChild(unlockInfo);
  }

  header.appendChild(titleSection);

  // Mode badge
  const modeBadge = document.createElement('span');
  const modeConfig = {
    private: { icon: '🔒', color: 'bg-slate-700/80 text-slate-200 border-slate-600/50', label: 'Private' },
    shared: { icon: '🔗', color: 'bg-blue-600/80 text-blue-100 border-blue-500/50', label: 'Shared' },
    public: { icon: '🌍', color: 'bg-purple-600/80 text-purple-100 border-purple-500/50', label: 'Public' }
  };
  const config = modeConfig[capsule.mode] || modeConfig.private;
  modeBadge.className = `flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${config.color} border backdrop-blur-sm shrink-0`;
  modeBadge.innerHTML = `<span>${config.icon}</span><span class="hidden sm:inline">${config.label}</span>`;
  header.appendChild(modeBadge);

  contentWrapper.appendChild(header);

  // Content text
  if (capsule.content_text) {
    const text = document.createElement('p');
    text.className = 'text-sm sm:text-base text-slate-300 line-clamp-3 whitespace-pre-line leading-relaxed';
    text.textContent = capsule.content_text;
    contentWrapper.appendChild(text);
  }

  // Media preview
  if (capsule.media_url) {
    const mediaWrapper = document.createElement('div');
    mediaWrapper.className = 'relative rounded-xl overflow-hidden bg-slate-950/50 border border-white/5';
    
    if (capsule.media_type?.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = capsule.media_url;
      img.alt = capsule.title ?? 'Media kapsul';
      img.className = 'w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500';
      mediaWrapper.appendChild(img);
      
      // Gradient overlay on image
      const imgOverlay = document.createElement('div');
      imgOverlay.className = 'absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none';
      mediaWrapper.appendChild(imgOverlay);
    } else if (capsule.media_type?.startsWith('audio/')) {
      const audioContainer = document.createElement('div');
      audioContainer.className = 'p-3 sm:p-4';
      const audio = document.createElement('audio');
      audio.src = capsule.media_url;
      audio.controls = true;
      audio.className = 'w-full';
      audioContainer.appendChild(audio);
      mediaWrapper.appendChild(audioContainer);
    }
    contentWrapper.appendChild(mediaWrapper);
  }

  // Actions section
  const actions = document.createElement('div');
  actions.className = 'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2';

  if (onOpen) {
    const openButton = document.createElement('button');
    openButton.type = 'button';
    const isUnlocked = capsule.is_opened || (capsule.unlock_at && new Date(capsule.unlock_at) <= new Date());
    
    openButton.className = `flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
      isUnlocked 
        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50' 
        : 'bg-slate-700/50 text-slate-400 cursor-not-allowed border border-slate-600/50'
    }`;
    
    const icon = document.createElement('span');
    icon.innerHTML = isUnlocked 
      ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>'
      : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>';
    openButton.appendChild(icon);
    
    const buttonText = document.createElement('span');
    buttonText.textContent = isUnlocked ? 'Lihat Kapsul' : 'Terkunci';
    openButton.appendChild(buttonText);
    
    openButton.disabled = !isUnlocked;
    openButton.addEventListener('click', () => onOpen(capsule));
    actions.appendChild(openButton);
  }

  if (onReact) {
    const reactionWrapper = document.createElement('div');
    reactionWrapper.className = 'flex items-center gap-2 justify-center sm:justify-start';
    ['💖', '😂', '🤔'].forEach((emoji) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'flex items-center justify-center w-10 h-10 text-lg rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-white/5 hover:border-white/20 hover:scale-110 transition-all duration-200';
      button.textContent = emoji;
      button.addEventListener('click', () => onReact(capsule, emoji));
      reactionWrapper.appendChild(button);
    });
    actions.appendChild(reactionWrapper);
  }

  contentWrapper.appendChild(actions);
  card.appendChild(contentWrapper);
  
  return card;
}
