import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-24 min-h-screen">
      {/* Hero Section */}
      <header className="text-center max-w-4xl pt-16 pb-8 animate-fade-in">
        <div className="inline-block px-6 py-2 bg-[#CCFF00] text-black text-sm font-bold uppercase tracking-widest mb-8 border-2 border-black shadow-[4px_4px_0_0_#F4F4F0]">
          Portfolio // TERMINAL
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Selamat Datang di
          <span className="relative inline-block ml-2">
            <span className="relative z-10">Halaman Portfolio Saya</span>
            <span className="absolute bottom-2 left-0 w-full h-1 bg-[#CCFF00]"></span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#B4B4B0] mb-10 leading-relaxed max-w-2xl mx-auto">
          Halaman ini menyediakan berbagai project yang telah saya kembangkan dengan passion dan dedikasi.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-[#CCFF00] text-black font-bold border-[3px] border-black shadow-[6px_6px_0_0_#F4F4F0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#F4F4F0] transition-all duration-150"
          >
            Lihat Project
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-transparent text-[#00E5FF] border-[3px] border-[#00E5FF] font-bold shadow-[6px_6px_0_0_#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#00E5FF] transition-all duration-150"
          >
            Hubungi Saya
          </a>
        </div>
      </header>

      {/* Projects Section */}
      <section id="projects" className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">My Projects</h2>
          <p className="text-[#B4B4B0] text-lg">Eksplorasi berbagai project yang telah saya buat</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manhwaku */}
          <div className="group bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#FF00E5] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#FF00E5] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF00E5] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
            <div className="text-5xl mb-6">💬</div>
            <h3 className="text-xl font-bold mb-3">Manhwaku</h3>
            <p className="text-[#B4B4B0] mb-6 leading-relaxed">
              Aplikasi Toonara menggunakan beberapa sumber untuk menampilkan data. | Scrape data otomatis dan Deteksi chapter terbaru
            </p>
            <Link href="/projects/manhwaku" className="inline-block text-[#FF00E5] font-bold relative group/link">
              Lihat Detail &rarr;
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF00E5] transform scale-x-0 origin-right transition-transform duration-300 group-hover/link:scale-x-100 group-hover/link:origin-left"></span>
            </Link>
          </div>

          {/* Tweet Scraper */}
          <div className="group bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#CCFF00] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#CCFF00] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
            <div className="text-5xl mb-6">🐦</div>
            <h3 className="text-xl font-bold mb-3">Tweet Scraper - Enhanced Edition</h3>
            <p className="text-[#B4B4B0] mb-6 leading-relaxed">
              Aplikasi desktop berbasis GUI untuk scraping data tweet dari X.com. Dilengkapi fitur filter tanggal, deduplikasi otomatis, tracking progress, dan ekspor data.
            </p>
            <Link href="/projects/tweet-scraper" className="inline-block text-[#CCFF00] font-bold relative group/link">
              Lihat Detail &rarr;
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#CCFF00] transform scale-x-0 origin-right transition-transform duration-300 group-hover/link:scale-x-100 group-hover/link:origin-left"></span>
            </Link>
          </div>

          {/* Panen Tweet */}
          <div className="group bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#00E5FF] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#00E5FF] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00E5FF] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
            <div className="text-5xl mb-6">🌾</div>
            <h3 className="text-xl font-bold mb-3">Panen Tweet</h3>
            <p className="text-[#B4B4B0] mb-6 leading-relaxed">
              Library Python untuk scraping Twitter/X. Ekstrak tweet berdasarkan keyword, tanggal, bahasa dengan mudah. Tersedia di PyPI.
            </p>
            <Link href="/projects/panen-tweet" className="inline-block text-[#00E5FF] font-bold relative group/link">
              Lihat Dokumentasi &rarr;
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00E5FF] transform scale-x-0 origin-right transition-transform duration-300 group-hover/link:scale-x-100 group-hover/link:origin-left"></span>
            </Link>
          </div>

          {/* Coming Soon */}
          <div className="group bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#3f3f46] relative overflow-hidden opacity-60">
            <div className="text-5xl mb-6">📦</div>
            <h3 className="text-xl font-bold mb-3">Coming Soon</h3>
            <p className="text-[#B4B4B0] mb-6 leading-relaxed">
              Sedang Mengerjakan Project Berikutnya.
            </p>
            <span className="inline-block text-[#B4B4B0] font-semibold cursor-not-allowed">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Get In Touch</h2>
          <p className="text-[#B4B4B0] text-lg">Mari terhubung dan berkolaborasi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/ramadhanigb1997/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#FF00E5] text-center transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#FF00E5]"
          >
            <div className="text-5xl mb-6">📷</div>
            <h3 className="text-xl font-bold mb-2">Instagram</h3>
            <p className="text-[#B4B4B0]">@ramadhanigb1997</p>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/DhaniAAA/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#CCFF00] text-center transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#CCFF00]"
          >
            <div className="text-5xl mb-6">💻</div>
            <h3 className="text-xl font-bold mb-2">Github</h3>
            <p className="text-[#B4B4B0]">DhaniAAA</p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/dhaniaaa/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#111111] border-[3px] border-[#F4F4F0] p-8 shadow-[6px_6px_0_0_#00E5FF] text-center transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#00E5FF]"
          >
            <div className="text-5xl mb-6">💼</div>
            <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
            <p className="text-[#B4B4B0]">Ramadhani</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-8 border-t-[3px] border-[#F4F4F0] mt-auto">
        <p className="text-[#B4B4B0] text-sm font-mono">© 2025 DhaniAAA // <span className="text-[#CCFF00]">SCRAPER_LIME_TERMINAL</span>. All rights reserved.</p>
      </footer>
    </div>
  );
}
