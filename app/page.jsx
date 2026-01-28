import Link from "next/link";
import Section from "../components/Section";
import Card from "../components/Card";

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-sm uppercase tracking-[0.4em] text-primary-100">Himmah NWDI Lebak Bulus</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">mengaktifkan akal, menumbuhkan jiwa, mengembangkan pengetahuan.</h2>
          <p className="mt-4 max-w-2xl text-primary-100">
            Menjadi rumah kolaborasi mahasiswa, pemuda, dan masyarakat untuk mengembangkan diri, pendidikan,
            dan pengabdian sosial secara berkelanjutan.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/program"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700"
            >
              Lihat Program
            </Link>
            <Link
              href="/kirim-artikel"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white"
            >
              Kirim Artikel
            </Link>
          </div>
        </div>
      </section>

      <Section title="Fokus Gerakan" subtitle="Tentang Kami">
        <div className="grid gap-6 md:grid-cols-3">
          <Card
            title="Kaderisasi"
            description="Membangun kader muda yang berdaya, berakhlak, dan siap mengabdi di tengah masyarakat."
            footer="Pelatihan rutin"
          />
          <Card
            title="Pendidikan"
            description="Mendorong literasi dan pembelajaran berkelanjutan melalui kelas penguatan dan mentoring."
            footer="Ruang belajar"
          />
          <Card
            title="Sosial Kemasyarakatan"
            description="Program pengabdian berbasis kebutuhan warga, tanggap bencana, dan layanan sosial."
            footer="Relawan aktif"
          />
        </div>
      </Section>

      <Section title="Informasi Terkini" subtitle="Publikasi">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-lg font-semibold">Pengumuman Terbaru</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Rapat koordinasi pengurus - Jumat, 19.30 WITA.</li>
              <li>Open recruitment relawan pendidikan gelombang II.</li>
              <li>Program beasiswa santri berprestasi akan dibuka bulan depan.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <h3 className="text-lg font-semibold">Akses Cepat</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link className="text-primary-600 font-medium" href="/artikel">
                Baca artikel inspiratif
              </Link>
              <Link className="text-primary-600 font-medium" href="/kontak">
                Hubungi sekretariat
              </Link>
              <Link className="text-primary-600 font-medium" href="/profil">
                Kenal organisasi
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
