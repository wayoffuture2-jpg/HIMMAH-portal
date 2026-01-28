import Section from "../../components/Section";

const announcements = [
  {
    title: "Rapat Koordinasi Pengurus",
    date: "15 Juni 2024",
    detail: "Pembahasan program semester kedua dan evaluasi kegiatan sosial."
  },
  {
    title: "Pelatihan Public Speaking",
    date: "22 Juni 2024",
    detail: "Terbuka untuk kader muda dan relawan, bertempat di aula sekretariat."
  },
  {
    title: "Gerakan Jumat Berbagi",
    date: "Setiap Jumat",
    detail: "Distribusi makanan untuk warga sekitar Masjid Lebak Bulus."
  }
];

export default function PengumumanPage() {
  return (
    <Section title="Pengumuman" subtitle="Info Terkini">
      <div className="grid gap-4">
        {announcements.map((item) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary-500">{item.date}</p>
            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
