'use client';
import Link from 'next/link';

export default function PanenTweetProject() {
  const copyInstall = () => {
    navigator.clipboard.writeText('pip install panen-tweet');
    const btn = document.getElementById('copy-btn');
    if (btn) {
      btn.textContent = 'Copied!';
      btn.classList.add('bg-green-500');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('bg-green-500');
      }, 2000);
    }
  };

  const copyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const pre = btn.closest('.rounded-xl')?.querySelector('pre');
    if (pre && pre.textContent) {
      navigator.clipboard.writeText(pre.textContent);
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = 'Copy'), 2000);
    }
  };

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      {/* Header */}
      <header className="text-center mb-16 py-12">
        <div className="text-7xl mb-6">🌾</div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight">
          Panen Tweet
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          Library Python powerful untuk scraping Twitter/X menggunakan Selenium. Ekstrak tweet berdasarkan
          keyword, tanggal, bahasa dengan mudah.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="px-4 py-2 bg-green-900/50 border border-green-600/50 rounded-full text-green-400 text-sm font-semibold">
            v1.0.5
          </span>
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 text-sm">
            Python 3.7+
          </span>
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 text-sm">
            MIT License
          </span>
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 text-sm">
            Open Source
          </span>
        </div>

        {/* Quick Install */}
        <div className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-xl mb-8">
          <code className="text-green-400 text-lg font-mono">pip install panen-tweet</code>
          <button
            onClick={copyInstall}
            className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 text-sm"
            id="copy-btn"
          >
            Copy
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://pypi.org/project/panen-tweet/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/5 border border-white/20 rounded-xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            📦 PyPI
          </a>
          <a
            href="https://github.com/Dhaniaaa/panen-tweet"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/5 border border-white/20 rounded-xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            💻 GitHub
          </a>
          <a
            href="https://github.com/Dhaniaaa/panen-tweet/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/5 border border-white/20 rounded-xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            🐛 Issues
          </a>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4 text-white">📑 Daftar Isi</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <li><a href="#instalasi" className="text-gray-400 hover:text-white transition-colors">📦 Instalasi</a></li>
          <li><a href="#auth-token" className="text-gray-400 hover:text-white transition-colors">🔑 Mendapatkan Auth Token</a></li>
          <li><a href="#penggunaan" className="text-gray-400 hover:text-white transition-colors">🚀 Cara Penggunaan</a></li>
          <li><a href="#output" className="text-gray-400 hover:text-white transition-colors">📊 Format Output</a></li>
          <li><a href="#parameter" className="text-gray-400 hover:text-white transition-colors">⚙️ Parameter & Konfigurasi</a></li>
          <li><a href="#tips" className="text-gray-400 hover:text-white transition-colors">💡 Tips & Tricks</a></li>
          <li><a href="#troubleshooting" className="text-gray-400 hover:text-white transition-colors">🐛 Troubleshooting</a></li>
        </ul>
      </nav>

      {/* Instalasi */}
      <section id="instalasi" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span>📦</span>
          <span>Instalasi</span>
        </h2>

        <h3 className="text-xl font-semibold mb-4 text-gray-200">Instalasi dari PyPI (Recommended)</h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium uppercase">Terminal</span>
            <button onClick={copyCode} className="text-gray-500 hover:text-white text-sm transition-colors">Copy</button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-gray-300 font-mono">pip install panen-tweet</pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-200">Instalasi dari Source</h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium uppercase">Terminal</span>
            <button onClick={copyCode} className="text-gray-500 hover:text-white text-sm transition-colors">Copy</button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-gray-300 font-mono">{'git clone https://github.com/Dhaniaaa/panen-tweet.git\ncd panen-tweet\npip install -e .'}</pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-200">🐧 Running di Google Colab / Linux</h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium uppercase">Google Colab</span>
            <button onClick={copyCode} className="text-gray-500 hover:text-white text-sm transition-colors">Copy</button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-gray-300 font-mono bg-transparent m-0 p-0">
              <span className="text-gray-500"># 1. Install library</span>{'\n'}
              !pip install panen-tweet{'\n\n'}
              <span className="text-gray-500"># 2. Install Google Chrome</span>{'\n'}
              !panen-tweet install-chrome
            </pre>
          </div>
        </div>
      </section>

      {/* Auth Token */}
      <section id="auth-token" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span>🔑</span>
          <span>Mendapatkan Auth Token</span>
        </h2>
        <p className="text-gray-400 mb-6">
          Sebelum menggunakan, Anda perlu mendapatkan <code className="bg-white/10 px-2 py-1 rounded text-green-400 font-mono">auth_token</code> dari akun Twitter/X Anda:
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Login ke X.com</h4>
              <p className="text-gray-400 text-sm">Buka <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">x.com</a> dan login menggunakan browser</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Buka Developer Tools</h4>
              <p className="text-gray-400 text-sm">Tekan <strong className="text-white">F12</strong> untuk membuka Developer Tools</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Buka Tab Application</h4>
              <p className="text-gray-400 text-sm">Pilih tab <strong className="text-white">Application</strong> (Chrome) atau <strong className="text-white">Storage</strong> (Firefox)</p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Temukan Cookie</h4>
              <p className="text-gray-400 text-sm">Expand <strong className="text-white">Cookies</strong> → klik <strong className="text-white">https://x.com</strong></p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Salin auth_token</h4>
              <p className="text-gray-400 text-sm">Cari cookie <code className="bg-white/10 px-2 py-0.5 rounded text-green-400 font-mono">auth_token</code> dan salin nilainya</p>
            </div>
          </div>
        </div>

        {/* Warning & Disclaimer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6">
            <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2">
              <span>⚠️</span>
              <span>PENTING - Keamanan Token</span>
            </h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• JANGAN bagikan auth_token Anda kepada siapapun</li>
              <li>• Token ini memberikan akses penuh ke akun Twitter/X Anda</li>
            </ul>
          </div>
          <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6">
            <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
              <span>🛡️</span>
              <span>Developer Disclaimer</span>
            </h4>
            <p className="text-gray-300 text-sm mb-3">Kemanan privasi Anda adalah prioritas kami.</p>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Token Anda <strong>HANYA</strong> digunakan secara lokal di komputer Anda.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Developer <strong>TIDAK PERNAH</strong> menyimpan, mencatat, atau mengirim token Anda ke server manapun.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Library ini 100% open source, Anda bisa memeriksa kode sumbernya di GitHub.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cara Penggunaan */}
      <section id="penggunaan" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span>🚀</span>
          <span>Cara Penggunaan</span>
        </h2>

        <h3 className="text-xl font-semibold mb-4 text-gray-200">Opsi 1: Command Line Interface (Termudah)</h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10">
            <span className="text-gray-500 text-sm font-medium uppercase">Terminal</span>
          </div>
          <div className="p-4">
            <pre className="text-gray-300 font-mono">panen-tweet</pre>
          </div>
        </div>
        <p className="text-gray-400 mb-6">Program akan meminta: auth_token, keyword, jumlah tweet, tanggal, bahasa, dan jenis tweet.</p>

        <h3 className="text-xl font-semibold mb-4 text-gray-200">Opsi 2: Library Python</h3>
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
            <span className="text-gray-500 text-sm font-medium uppercase">Python</span>
            <button onClick={copyCode} className="text-gray-500 hover:text-white text-sm transition-colors">Copy</button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-gray-300 font-mono">
              <span className="text-purple-400">from</span> panen_tweet <span className="text-purple-400">import</span> TwitterScraper{'\n'}
              <span className="text-purple-400">import</span> datetime, os{'\n\n'}
              <span className="text-gray-500"># Setup</span>{'\n'}
              auth_token = os.getenv(<span className="text-green-400">&quot;TWITTER_AUTH_TOKEN&quot;</span>){'\n\n'}
              <span className="text-gray-500"># Inisialisasi scraper</span>{'\n'}
              scraper = TwitterScraper({'\n'}
              auth_token=auth_token,{'\n'}
              scroll_pause_time=<span className="text-orange-400">5</span>,{'\n'}
              headless=<span className="text-purple-400">True</span>{'\n'}
              ){'\n\n'}
              <span className="text-gray-500"># Scraping</span>{'\n'}
              df = scraper.scrape_with_date_range({'\n'}
              keyword=<span className="text-green-400">&quot;python programming&quot;</span>,{'\n'}
              target_per_session=<span className="text-orange-400">100</span>,{'\n'}
              start_date=datetime.datetime(<span className="text-orange-400">2024, 1, 1</span>),{'\n'}
              end_date=datetime.datetime(<span className="text-orange-400">2024, 1, 7</span>),{'\n'}
              interval_days=<span className="text-orange-400">1</span>,{'\n'}
              lang=<span className="text-green-400">&quot;en&quot;</span>,{'\n'}
              search_type=<span className="text-green-400">&quot;latest&quot;</span>{'\n'}
              ){'\n\n'}
              <span className="text-gray-500"># Simpan hasil</span>{'\n'}
              <span className="text-purple-400">if</span> df <span className="text-purple-400">is not None</span>:{'\n'}
              scraper.save_to_csv(df, <span className="text-green-400">&quot;hasil.csv&quot;</span>)
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-200">Opsi 3: Environment Variable</h3>
        <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-4 mb-4">
          <p className="text-green-400 text-sm">💡 Recommended untuk security - simpan token di environment variable</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10">
              <span className="text-gray-500 text-sm font-medium">PowerShell</span>
            </div>
            <div className="p-4">
              <pre className="text-gray-300 text-sm font-mono">$env:TWITTER_AUTH_TOKEN = &quot;token&quot;{'\n'}panen-tweet</pre>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10">
              <span className="text-gray-500 text-sm font-medium">Linux/Mac</span>
            </div>
            <div className="p-4">
              <pre className="text-gray-300 text-sm font-mono">export TWITTER_AUTH_TOKEN=&quot;token&quot;{'\n'}panen-tweet</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Format Output */}
      <section id="output" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span>📊</span>
          <span>Format Output</span>
        </h2>
        <p className="text-gray-400 mb-6">Data yang dihasilkan dalam format CSV dengan kolom:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
            <code className="text-green-400 font-mono">username</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
            <code className="text-green-400 font-mono">handle</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
            <code className="text-green-400 font-mono">timestamp</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
            <code className="text-green-400 font-mono">tweet_text</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
            <code className="text-green-400 font-mono">url</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
            <code className="text-green-400 font-mono">reply_count</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
            <code className="text-green-400 font-mono">retweet_count</code>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
            <code className="text-green-400 font-mono">like_count</code>
          </div>
        </div>
      </section>

      {/* Parameter */}
      <section id="parameter" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span>⚙️</span>
          <span>Parameter & Konfigurasi</span>
        </h2>

        <h3 className="text-xl font-semibold mb-4 text-gray-200">TwitterScraper Parameters</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-white font-semibold">Parameter</th>
                <th className="py-3 px-4 text-white font-semibold">Tipe</th>
                <th className="py-3 px-4 text-white font-semibold">Default</th>
                <th className="py-3 px-4 text-white font-semibold">Deskripsi</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">auth_token</code></td>
                <td className="py-3 px-4">string</td>
                <td className="py-3 px-4">None</td>
                <td className="py-3 px-4">Cookie auth_token (WAJIB)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">scroll_pause_time</code></td>
                <td className="py-3 px-4">int</td>
                <td className="py-3 px-4">5</td>
                <td className="py-3 px-4">Jeda antar scroll (detik)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">headless</code></td>
                <td className="py-3 px-4">bool</td>
                <td className="py-3 px-4">True</td>
                <td className="py-3 px-4">True = tanpa GUI</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-200">scrape_with_date_range Parameters</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-white font-semibold">Parameter</th>
                <th className="py-3 px-4 text-white font-semibold">Deskripsi</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">keyword</code></td>
                <td className="py-3 px-4">Kata kunci pencarian (WAJIB)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">target_per_session</code></td>
                <td className="py-3 px-4">Jumlah target tweet per sesi</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">start_date / end_date</code></td>
                <td className="py-3 px-4">Rentang tanggal (WAJIB)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">interval_days</code></td>
                <td className="py-3 px-4">Interval hari per sesi (1 = per hari)</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">lang</code></td>
                <td className="py-3 px-4">Kode bahasa: &quot;id&quot;, &quot;en&quot;, &quot;ja&quot;, dll</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4"><code className="text-green-400 font-mono">search_type</code></td>
                <td className="py-3 px-4">&quot;top&quot; atau &quot;latest&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span>💡</span>
          <span>Tips & Tricks</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6">
            <h4 className="text-green-400 font-bold mb-3">🎯 Scraping Banyak Tweet</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Gunakan interval kecil (1 hari)</li>
              <li>• Set target_per_session 50-200</li>
              <li>• scroll_pause_time 7-10 detik untuk koneksi lambat</li>
            </ul>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6">
            <h4 className="text-yellow-400 font-bold mb-3">⚡ Menghindari Rate Limit</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• scroll_pause_time minimal 5 detik</li>
              <li>• Beri jeda antar sesi scraping</li>
              <li>• Jangan jalankan multiple instance</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-200">Kode Bahasa</h3>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm"><code className="text-green-400 font-mono">id</code> - Indonesia</span>
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm"><code className="text-green-400 font-mono">en</code> - English</span>
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm"><code className="text-green-400 font-mono">ja</code> - Japanese</span>
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm"><code className="text-green-400 font-mono">es</code> - Spanish</span>
          <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm"><code className="text-green-400 font-mono">fr</code> - French</span>
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <span>🐛</span>
          <span>Troubleshooting</span>
        </h2>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3 text-white">Error: &quot;WebDriver not found&quot;</h3>
            <p className="text-gray-400">Package otomatis download ChromeDriver. Pastikan Chrome terinstall.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3 text-white">Error: &quot;Auth token invalid&quot;</h3>
            <ul className="text-gray-400 space-y-1">
              <li>1. Login ulang ke x.com</li>
              <li>2. Dapatkan auth_token baru</li>
              <li>3. Pastikan tidak ada spasi saat copy-paste</li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3 text-white">Error: &quot;No tweets found&quot;</h3>
            <ul className="text-gray-400 space-y-1">
              <li>• Periksa koneksi internet</li>
              <li>• Verifikasi auth_token masih valid</li>
              <li>• Coba keyword lain atau rentang tanggal berbeda</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-16">
        <div className="text-center py-16 px-8 bg-white/5 border border-white/10 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4">Siap Menggunakan Panen Tweet?</h2>
          <p className="text-xl text-gray-400 mb-8">Install sekarang dan mulai scraping data tweet</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://pypi.org/project/panen-tweet/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              📦 Install dari PyPI
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
        <p className="text-gray-500 mb-2">Made with ❤️ for the data science & research community</p>
        <p className="text-gray-600 text-sm">© 2025 DhaniAAA. All rights reserved.</p>
      </footer>
    </div>
  );
}
