import Link from 'next/link';

export const metadata = {
  title: 'Manhwaku - Project Detail | DhaniAAA',
};

export default function ManhwakuProject() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <nav className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-x-1"
        >
          <span>←</span>
          <span className="font-medium">Kembali ke Portfolio</span>
        </Link>
      </nav>

      {/* Project Header */}
      <header className="text-center mb-16 py-12">
        <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 rounded-full text-gray-300 text-sm font-semibold uppercase tracking-wider mb-6">
          Web Application
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight">
          Manhwaku
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          Platform Baca Manhwa Online dengan Auto-Scraping & Update Otomatis
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 p-6 bg-white/5 rounded-2xl border border-white/10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">Status:</span>
            <span className="text-white font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">Tech Stack:</span>
            <span className="text-white font-semibold">Next.js, TypeScript, TailwindCSS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium">Launch:</span>
            <span className="text-white font-semibold">2025</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.toonara.my.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/20"
          >
            🌐 Kunjungi Website
          </a>
          <a
            href="https://github.com/DhaniAAA/manhwaku"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/5 border border-white/20 rounded-xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            💻 View on GitHub
          </a>
        </div>
      </header>

      {/* Screenshot Section */}
      <section className="mb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 group">
          <img
            src="/assets/img/image.png"
            alt="Manhwaku Screenshot"
            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-md rounded-lg border border-white/10">
            <span className="text-white text-sm font-semibold">Live Preview</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <span>📖</span>
          <span>Tentang Project</span>
        </h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <p className="text-gray-400 text-lg leading-relaxed mb-4">
            <strong className="text-white">Toonara</strong> adalah platform web modern untuk membaca manhwa (komik
            Korea) secara online. Aplikasi ini dibangun dengan teknologi terkini untuk memberikan pengalaman membaca yang optimal dan
            responsif di berbagai perangkat.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Platform ini mengintegrasikan sistem scraping otomatis yang mengumpulkan data dari berbagai sumber
            terpercaya, memastikan konten selalu up-to-date dengan chapter terbaru. Sistem deteksi otomatis
            memantau pembaruan chapter baru secara real-time.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>✨</span>
          <span>Fitur Utama</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3">Auto-Scraping</h3>
            <p className="text-gray-400 leading-relaxed">
              Sistem scraping otomatis mengumpulkan data dari multiple sources secara efisien dan terstruktur.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-xl font-bold mb-3">Deteksi Chapter Terbaru</h3>
            <p className="text-gray-400 leading-relaxed">
              Notifikasi real-time untuk chapter baru yang dirilis, memastikan Anda tidak ketinggalan update.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-3">Responsive Design</h3>
            <p className="text-gray-400 leading-relaxed">
              Interface yang optimal di semua perangkat - desktop, tablet, dan mobile.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-3">Modern UI/UX</h3>
            <p className="text-gray-400 leading-relaxed">
              Desain modern dengan dark mode, smooth animations, dan navigasi yang intuitif.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-3">Advanced Search</h3>
            <p className="text-gray-400 leading-relaxed">
              Pencarian cepat dan filter berdasarkan genre, status, dan popularitas.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Fast Loading</h3>
            <p className="text-gray-400 leading-relaxed">
              Optimasi performa dengan lazy loading dan caching untuk pengalaman yang smooth.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>🛠️</span>
          <span>Technical Stack</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-xl font-bold text-white mb-4 pb-3 border-b-2 border-white/20">
              Frontend
            </div>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>Next.js</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>TypeScript</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>TailwindCSS</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>React Hooks</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-xl font-bold text-white mb-4 pb-3 border-b-2 border-white/20">
              Backend
            </div>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>Next.js API Routes</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>Web Scraping (Cheerio)</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>Data Validation</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>Caching Strategy</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-xl font-bold text-white mb-4 pb-3 border-b-2 border-white/20">
              Tools & Services
            </div>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>Vercel Deployment</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>Google Analytics</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>SEO Optimization</span>
              </li>
              <li className="text-gray-400 flex items-start gap-2">
                <span className="text-white font-bold">▹</span>
                <span>Performance Monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>💡</span>
          <span>Challenges & Solutions</span>
        </h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="pb-6 border-b border-white/10 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold mb-3">🎯 Challenge: Data Consistency</h3>
            <p className="text-gray-400 leading-relaxed">
              <strong className="text-white">Solution:</strong> Implementasi sistem validasi data multi-layer dan
              normalisasi untuk memastikan konsistensi data dari berbagai sumber.
            </p>
          </div>
          <div className="pb-6 border-b border-white/10 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold mb-3">🎯 Challenge: Performance Optimization</h3>
            <p className="text-gray-400 leading-relaxed">
              <strong className="text-white">Solution:</strong> Menggunakan incremental static regeneration (ISR),
              image optimization, dan lazy loading untuk meningkatkan performa.
            </p>
          </div>
          <div className="pb-6 border-b border-white/10 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold mb-3">🎯 Challenge: Real-time Updates</h3>
            <p className="text-gray-400 leading-relaxed">
              <strong className="text-white">Solution:</strong> Scheduled scraping dengan webhook integration
              untuk deteksi dan update chapter baru secara otomatis.
            </p>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>📊</span>
          <span>Results & Impact</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl font-extrabold text-white mb-2">200+</div>
            <div className="text-gray-500 font-medium">Manhwa Titles</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl font-extrabold text-white mb-2">1K+</div>
            <div className="text-gray-500 font-medium">Monthly Visitors</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl font-extrabold text-white mb-2">95%</div>
            <div className="text-gray-500 font-medium">Update Accuracy</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-white/10">
            <div className="text-5xl font-extrabold text-white mb-2">&lt;4s</div>
            <div className="text-gray-500 font-medium">Page Load Time</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-16">
        <div className="text-center py-16 px-8 bg-white/5 border border-white/10 rounded-3xl">
          <h2 className="text-4xl font-bold mb-4">Tertarik untuk Melihat Lebih Lanjut?</h2>
          <p className="text-xl text-gray-400 mb-8">Kunjungi website langsung atau lihat source code di GitHub</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.toonara.my.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/20"
            >
              🌐 Kunjungi Manhwaku
            </a>
            <Link
              href="/"
              className="px-8 py-4 bg-white/5 border border-white/20 rounded-xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              ← Kembali ke Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10">
        <p className="text-gray-500">© 2025 DhaniAAA. All rights reserved.</p>
      </footer>
    </div>
  );
}
