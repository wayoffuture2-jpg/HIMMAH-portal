import Section from "../../components/Section";

export default function ProfilPage() {
  return (
    <div>
      <Section title="Profil Organisasi" subtitle="Himmah NWDI">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-sm text-slate-700">
          <p>
            HIMMAH NWDI Komisariat Lebak Bulus adalah ruang berpikir dan bertumbuh bagi Mahasiswa-tempat iman berdialog dengan akal, tradisi bertemu modernitas, dan gagasan diuji lewat diskusi kritis. Berpijak pada nilai Islam, kami merespons zaman dengan kesadaran, etika, dan intelektualitas.
          </p>
          <p>
            Kami memiliki visi membentuk generasi muda yang berakhlak, produktif, dan mampu berkontribusi
            nyata dalam dakwah serta pembangunan sosial.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">Visi</p>
              <p className="mt-2">Menjadi ruang tumbuh bagi generasi muda yang kritis, reflektif, dan berdaya dalam membaca serta merespons realitas sosial.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">Misi</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Mengembangkan budaya berpikir kritis dan dialog terbuka.</li>
                <li>Membentuk kader yang beretika, mandiri, dan bertanggung jawab.</li>
                <li>Mendorong keterlibatan aktif dalam isu sosial, pendidikan, dan kemanusiaan.</li>
              </ul>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">Nilai</p>
              <p className="mt-2">
                Kritis — berani bertanya dan menguji gagasan
                Etis — berpikir tajam tanpa kehilangan tanggung jawab moral. 
                Solidaritas — tumbuh bersama dan berpihak pada kemanusiaan.</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
