const DEFAULT_REACTIONS = ['💖', '😂', '🤔'];

export function createReactionButtons({ onReact, disabled = false, reactions = DEFAULT_REACTIONS } = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex gap-2';

  reactions.forEach((emoji) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'px-2 py-1 text-lg rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed';
    button.textContent = emoji;
    button.disabled = disabled;
    button.addEventListener('click', () => {
      if (typeof onReact === 'function') {
        onReact(emoji);
      }
    });

    wrapper.appendChild(button);
  });

  return wrapper;
}
