import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Portal Himpunan Mahasiswa",
  description: "Website resmi Himmah NWDI Lebak Bulus"
};

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/pengumuman", label: "Pengumuman" },
  { href: "/program", label: "Program" },
  { href: "/artikel", label: "Artikel" },
  { href: "/kirim-artikel", label: "Kirim Artikel" },
  { href: "/kontak", label: "Kontak" }
];

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm">
           <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary-600">Portal</p>
                <h1 className="text-lg md:text-2xl font-bold leading-tight">
  Himmah NWDI<br className="md:hidden" />
  Lebak Bulus
</h1>
              </div>
              <nav className="flex flex-wrap justify-center gap-3 text-sm md:gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-slate-600 hover:text-primary-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-slate-900 text-slate-100">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-2 text-sm">
              <p className="font-semibold">Himmah NWDI Lebak Bulus</p>
              <p>Bergerak bersama membangun generasi berilmu, amanah, dan berdampak.</p>
              <p className="text-slate-400">© 2026 Himmah NWDI Lebak Bulus.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
