import Section from "../../components/Section";

const programs = [
  {
    title: "Kelas Tahfiz dan Tajwid",
    detail: "Kelas rutin mingguan untuk meningkatkan bacaan Al-Qur'an dan hafalan."
  },
  {
    title: "Pelatihan Keterampilan Pemuda",
    detail: "Workshop digital, desain, dan kewirausahaan sebagai bekal ekonomi kreatif."
  },
  {
    title: "Layanan Sosial dan Relawan",
    detail: "Pendampingan lansia, tanggap bencana, dan kegiatan sosial kolaboratif."
  }
];

export default function ProgramPage() {
  return (
    <Section title="Program Unggulan" subtitle="Kegiatan">
      <div className="grid gap-4 md:grid-cols-3">
        {programs.map((program) => (
          <div key={program.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold">{program.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{program.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
