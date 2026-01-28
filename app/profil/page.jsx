import Section from "../../components/Section";

export default function ProfilPage() {
  return (
    <div>
      <Section title="Profil Organisasi" subtitle="Himmah NWDI">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-sm text-slate-700">
          <p>
            Himmah NWDI Lebak Bulus adalah wadah kaderisasi dan pengabdian pemuda Nahdlatul Wathan Diniyah
            Islamiyah yang fokus pada penguatan iman, ilmu, dan amal sosial di lingkungan masyarakat.
          </p>
          <p>
            Kami memiliki visi membentuk generasi muda yang berakhlak, produktif, dan mampu berkontribusi
            nyata dalam dakwah serta pembangunan sosial.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">Visi</p>
              <p className="mt-2">Menjadi pusat kaderisasi pemuda Islam yang berdaya saing dan berkarakter.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">Misi</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Menguatkan pembinaan keagamaan dan kepemimpinan.</li>
                <li>Memberdayakan masyarakat melalui program edukasi.</li>
                <li>Menghubungkan jejaring dakwah dan sosial.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">Nilai</p>
              <p className="mt-2">Solidaritas, kebermanfaatan, dan keberlanjutan.</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
