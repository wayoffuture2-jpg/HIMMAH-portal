"use client";

import "./globals.css";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/pengumuman", label: "Pengumuman" },
  { href: "/program", label: "Program" },
  { href: "/artikel", label: "Artikel" },
  { href: "/kirim-artikel", label: "Kirim Artikel" },
  { href: "/kontak", label: "Kontak" },
];

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="id">
      <head>
        <title>Portal Himpunan Mahasiswa</title>
        <meta
          name="description"
          content="Website resmi Himmah NWDI Lebak Bulus"
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm uppercase tracking-[0.2em] text-primary-600">
                  Portal
                </p>

                <h1 className="text-lg md:text-2xl font-bold leading-tight">
                  Himpunan
                </h1>
                <p className="text-sm text-slate-600">Mahasiswa</p>
              </div>

              {/* Mobile button */}
              <button
  className="md:hidden rounded-lg border px-3 py-2 text-sm"
  onClick={() => setOpen(!open)}
>
  Menu
</button>

              {/* Desktop menu */}
              <nav className="hidden md:flex items-center gap-6 text-base">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-green-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile dropdown */}
              {open && (
                <div className="md:hidden w-full border-t pt-3">
                  <nav className="grid grid-cols-2 gap-3 text-sm">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg bg-slate-50 px-3 py-2 text-center"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="bg-slate-900 text-slate-100">
           <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              <p className="font-semibold">Himmah NWDI Lebak Bulus</p>
              <p>
                Bergerak bersama membangun generasi berilmu, amanah, dan
                berdampak.
              </p>
              <p className="text-slate-400">© 2026 Himmah NWDI Lebak Bulus.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
