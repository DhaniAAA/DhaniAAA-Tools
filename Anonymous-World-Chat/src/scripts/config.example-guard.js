(() => {
  if (!window.APP_CONFIG) {
    console.warn("APP_CONFIG not found. Copy src/scripts/config.example.js to src/scripts/config.js and customize it.");
    window.APP_CONFIG = {};
  }
})();

