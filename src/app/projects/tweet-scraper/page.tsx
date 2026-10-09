import Link from 'next/link';

export const metadata = {
  title: 'Tweet Scraper - Project Detail | DhaniAAA',
};

export default function TweetScraperProject() {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <nav className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] border-[3px] border-[#F4F4F0] text-[#F4F4F0] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-x-1"
        >
          <span>←</span>
          <span className="font-medium">Kembali ke Portfolio</span>
        </Link>
      </nav>

      {/* Project Header */}
      <header className="text-center mb-16 py-12">
        <div className="inline-block px-6 py-2 bg-[#111111] border-[3px] border-[#F4F4F0] text-[#F4F4F0] text-sm font-semibold uppercase tracking-wider mb-6">
          Desktop Application
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-[#F4F4F0] leading-tight">
          Tweet Scraper - Enhanced Edition
        </h1>

        <p className="text-xl text-[#B4B4B0] max-w-3xl mx-auto mb-8 leading-relaxed">
          Aplikasi Desktop GUI untuk Scraping Data Tweet dengan Multi-Threading & Analytics
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 p-6 bg-[#111111] border-[3px] border-[#F4F4F0] max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#B4B4B0] text-sm font-medium">Status:</span>
            <span className="text-[#F4F4F0] font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-[#00FF88] animate-pulse"></span>
              Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#B4B4B0] text-sm font-medium">Tech Stack:</span>
            <span className="text-[#F4F4F0] font-semibold">Python, PyQt5, Selenium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#B4B4B0] text-sm font-medium">Release:</span>
            <span className="text-[#F4F4F0] font-semibold">2024</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/DhaniAAA/Scrapping-Qt5-Tweet/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#CCFF00] text-black font-semibold hover:bg-[#F4F4F0] transition-all duration-300"
          >
            📥 Download Aplikasi
          </a>
          <a
            href="https://github.com/DhaniAAA/Scrapping-Qt5-Tweet"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#111111] border-[3px] border-[#F4F4F0] font-semibold hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300"
          >
            💻 View on GitHub
          </a>
        </div>
      </header>

      {/* Screenshots Carousel */}
      <section className="mb-16">
        <div className="relative overflow-hidden border-[3px] border-[#F4F4F0] group">
          <img
            src="/assets/img/image1.png"
            alt="Tweet Scraper Interface"
            className="w-full h-auto transform transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 px-4 py-2 bg-black/70 border-[3px] border-[#F4F4F0]">
            <span className="text-[#F4F4F0] text-sm font-semibold">Application Interface</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
          <span>📖</span>
          <span>Tentang Project</span>
        </h2>
        <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00]">
          <p className="text-[#B4B4B0] text-lg leading-relaxed mb-4">
            <strong className="text-[#F4F4F0]">Tweet Scraper - Enhanced Edition</strong> adalah aplikasi desktop
            berbasis GUI yang powerful untuk mengumpulkan dan menganalisis data dari X.com (Twitter). Aplikasi ini
            dirancang untuk researcher, data analyst, dan digital marketer yang membutuhkan data tweet secara
            terstruktur.
          </p>
          <p className="text-[#B4B4B0] text-lg leading-relaxed">
            Dilengkapi dengan interface yang user-friendly, multi-threading untuk performa optimal, dan berbagai fitur
            advanced seperti filter tanggal, deduplikasi otomatis, tracking progress real-time, serta ekspor data ke
            multiple format (CSV, JSON, Excel).
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
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Multi-Threading</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Scraping paralel dengan multiple threads untuk meningkatkan kecepatan hingga 5x lebih cepat.
            </p>
          </div>

          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-3">Date Range Filter</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Filter tweet berdasarkan rentang tanggal tertentu untuk mendapatkan data yang relevan.
            </p>
          </div>

          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-3">Auto Deduplication</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Sistem otomatis menghilangkan data duplikat untuk memastikan data yang clean dan akurat.
            </p>
          </div>

          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Monitor progress scraping secara real-time dengan progress bar dan statistik detail.
            </p>
          </div>

          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl mb-4">💾</div>
            <h3 className="text-xl font-bold mb-3">Multi-Format Export</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Export data ke CSV, JSON, atau Excel sesuai kebutuhan analisis Anda.
            </p>
          </div>

          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3">Analytics Dashboard</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Visualisasi data dengan charts dan statistik untuk insight yang lebih mendalam.
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
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00]">
            <div className="text-xl font-bold text-[#F4F4F0] mb-4 pb-3 border-b-2 border-[#F4F4F0]">
              Core Technologies
            </div>
            <ul className="space-y-3">
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Python 3.10+</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>PyQt5 (GUI Framework)</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Selenium WebDriver</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Threading & Queue</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00]">
            <div className="text-xl font-bold text-[#F4F4F0] mb-4 pb-3 border-b-2 border-[#F4F4F0]">
              Data Processing
            </div>
            <ul className="space-y-3">
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Pandas (Data Manipulation)</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>JSON & CSV Handling</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Excel Export (openpyxl)</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Data Validation</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00]">
            <div className="text-xl font-bold text-[#F4F4F0] mb-4 pb-3 border-b-2 border-[#F4F4F0]">
              Features
            </div>
            <ul className="space-y-3">
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Multi-Threading Engine</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Real-time Progress Updates</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Error Handling & Logging</span>
              </li>
              <li className="text-[#B4B4B0] flex items-start gap-2">
                <span className="text-[#F4F4F0] font-bold">▹</span>
                <span>Data Deduplication</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>⚙️</span>
          <span>Cara Kerja</span>
        </h2>
        <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00] space-y-6">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-[#CCFF00] text-black flex items-center justify-center text-xl font-bold">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Input Configuration</h3>
              <p className="text-[#B4B4B0] leading-relaxed">
                User memasukkan username/hashtag target, rentang tanggal, dan jumlah thread yang diinginkan.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-[#CCFF00] text-black flex items-center justify-center text-xl font-bold">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Multi-Thread Scraping</h3>
              <p className="text-[#B4B4B0] leading-relaxed">
                Aplikasi membagi task ke multiple threads untuk scraping paralel yang efisien.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-[#CCFF00] text-black flex items-center justify-center text-xl font-bold">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Data Processing</h3>
              <p className="text-[#B4B4B0] leading-relaxed">
                Data yang terkumpul diproses, divalidasi, dan dideduplikasi secara otomatis.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-[#CCFF00] text-black flex items-center justify-center text-xl font-bold">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Export & Analytics</h3>
              <p className="text-[#B4B4B0] leading-relaxed">
                User dapat melihat preview data, analytics, dan export ke format yang diinginkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>💡</span>
          <span>Challenges & Solutions</span>
        </h2>
        <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00] space-y-6">
          <div className="pb-6 border-b border-[#F4F4F0] last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold mb-3">🎯 Challenge: Rate Limiting</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              <strong className="text-[#F4F4F0]">Solution:</strong> Implementasi smart delay system dan request
              throttling untuk menghindari rate limit dari X.com.
            </p>
          </div>

          <div className="pb-6 border-b border-[#F4F4F0] last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold mb-3">🎯 Challenge: Dynamic Content Loading</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              <strong className="text-[#F4F4F0]">Solution:</strong> Menggunakan Selenium dengan explicit waits dan scroll
              automation untuk handle infinite scroll.
            </p>
          </div>

          <div className="pb-6 border-b border-[#F4F4F0] last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold mb-3">🎯 Challenge: Thread Synchronization</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              <strong className="text-[#F4F4F0]">Solution:</strong> Implementasi thread-safe queue dan proper locking
              mechanism untuk koordinasi antar threads.
            </p>
          </div>

          <div className="pb-6 border-b border-[#F4F4F0] last:border-b-0 last:pb-0">
            <h3 className="text-xl font-bold mb-3">🎯 Challenge: Memory Management</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              <strong className="text-[#F4F4F0]">Solution:</strong> Batch processing dan periodic memory cleanup untuk
              handle large dataset tanpa memory overflow.
            </p>
          </div>
        </div>
      </section>

      {/* Data Fields */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>📋</span>
          <span>Data yang Dikumpulkan</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-4 text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-3xl mb-2">👤</div>
            <div className="text-[#F4F4F0] font-semibold text-sm">Username</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-4 text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-[#F4F4F0] font-semibold text-sm">Tweet Content</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-4 text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-[#F4F4F0] font-semibold text-sm">Timestamp</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-4 text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-3xl mb-2">❤️</div>
            <div className="text-[#F4F4F0] font-semibold text-sm">Likes Count</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-4 text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-3xl mb-2">🔄</div>
            <div className="text-[#F4F4F0] font-semibold text-sm">Retweets Count</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-4 text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-3xl mb-2">💬</div>
            <div className="text-[#F4F4F0] font-semibold text-sm">Replies Count</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-4 text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-3xl mb-2">🔗</div>
            <div className="text-[#F4F4F0] font-semibold text-sm">Tweet URL</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-4 text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-3xl mb-2">🏷️</div>
            <div className="text-[#F4F4F0] font-semibold text-sm">Hashtags</div>
          </div>
        </div>
      </section>

      {/* Performance & Results */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>📊</span>
          <span>Performance & Results</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00] text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl font-extrabold text-[#F4F4F0] mb-2">5x</div>
            <div className="text-[#B4B4B0] font-medium">Faster with Multi-Threading</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00] text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl font-extrabold text-[#F4F4F0] mb-2">10K+</div>
            <div className="text-[#B4B4B0] font-medium">Tweets Scraped</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00] text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl font-extrabold text-[#F4F4F0] mb-2">99%</div>
            <div className="text-[#B4B4B0] font-medium">Data Accuracy</div>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00] text-center hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300 hover:-translate-y-2 hover:">
            <div className="text-5xl font-extrabold text-[#F4F4F0] mb-2">3</div>
            <div className="text-[#B4B4B0] font-medium">Export Formats</div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
          <span>🎯</span>
          <span>Use Cases</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Market Research</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Analisis sentiment dan trend untuk riset pasar dan kompetitor analysis.
            </p>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-3">Academic Research</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Pengumpulan data untuk penelitian akademis dan analisis sosial media.
            </p>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3">Brand Monitoring</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Monitor mention brand dan customer feedback secara real-time.
            </p>
          </div>
          <div className="bg-[#111111] border-[3px] border-[#F4F4F0] p-6 shadow-[6px_6px_0_0_#CCFF00] hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-3">Trend Analysis</h3>
            <p className="text-[#B4B4B0] leading-relaxed">
              Identifikasi trending topics dan viral content untuk strategy planning.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-16">
        <div className="text-center py-16 px-8 bg-[#111111] border-[3px] border-[#F4F4F0]">
          <h2 className="text-4xl font-bold mb-4">Siap Mencoba Tweet Scraper?</h2>
          <p className="text-xl text-[#B4B4B0] mb-8">Download aplikasi dan mulai scraping data tweet dengan mudah</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/DhaniAAA/Scrapping-Qt5-Tweet/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#CCFF00] text-black font-semibold hover:bg-[#F4F4F0] transition-all duration-300"
            >
              📥 Download Sekarang
            </a>
            <Link
              href="/"
              className="px-8 py-4 bg-[#111111] border-[3px] border-[#F4F4F0] font-semibold hover:bg-[#CCFF00] hover:text-black hover:border-[#F4F4F0] transition-all duration-300"
            >
              ← Kembali ke Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-[#F4F4F0]">
        <p className="text-[#B4B4B0]">© 2025 DhaniAAA. All rights reserved.</p>
      </footer>
    </div>
  );
}
