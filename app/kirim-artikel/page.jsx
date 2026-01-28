import Section from "../../components/Section";
import SubmitForm from "./SubmitForm";

export default function KirimArtikelPage() {
  return (
    <Section title="Kirim Artikel" subtitle="Kontributor">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <SubmitForm />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Panduan Penulisan</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Gunakan bahasa yang santun dan informatif.</li>
            <li>Pastikan informasi kegiatan lengkap (waktu, tempat, narasumber).</li>
            <li>Editor akan meninjau sebelum artikel dipublikasikan.</li>
            <li>Status awal artikel adalah <strong>pending</strong>.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
