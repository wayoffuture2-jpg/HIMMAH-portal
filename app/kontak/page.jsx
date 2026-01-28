import Section from "../../components/Section";

export default function KontakPage() {
  return (
    <Section title="Kontak" subtitle="Hubungi Kami">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid gap-6 md:grid-cols-3 text-sm text-slate-600">
          <div>
            <p className="font-semibold text-slate-900">Sekretariat</p>
            <p className="mt-2">Jalan Lebak Bulus Raya, Lombok Timur</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Email</p>
            <p className="mt-2">sekretariat@himmah.org</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">WhatsApp</p>
            <p className="mt-2">+62 812 0000 1122</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
