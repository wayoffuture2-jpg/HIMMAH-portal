"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Section from "../../components/Section";
import SubmitForm from "./SubmitForm";

export default function KirimArtikelPage() {
  const router = useRouter();

  // 🔐 GUARD: wajib login publik
  useEffect(() => {
    const logged = sessionStorage.getItem("pub_logged");
    if (!logged) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <Section title="Kirim Artikel" subtitle="Kontributor Publik">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        
        {/* FORM SUBMIT ARTIKEL */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <SubmitForm />
        </div>

        {/* PANDUAN PENULISAN */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Panduan Penulisan Artikel
          </h3>

          <p>
            Artikel yang dikirim akan melalui proses <strong>kurasi dan
            peninjauan editor</strong> sebelum dipublikasikan.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              Artikel ditulis dengan <strong>bahasa yang santun, argumentatif,
              dan informatif</strong>.
            </li>
            <li>
              Panjang tulisan disarankan antara <strong>600–1500 kata</strong>.
            </li>
            <li>
              Sertakan <strong>rujukan, data, atau referensi</strong> jika
              mengutip pendapat, ayat, teori, atau peristiwa.
            </li>
            <li>
              Tulisan bersifat <strong>orisinal</strong> dan tidak melanggar hak
              cipta.
            </li>
            <li>
              Artikel yang mengandung ujaran kebencian, hoaks, atau provokasi
              akan <strong>ditolak</strong>.
            </li>
          </ul>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-slate-900 mb-2">
              Ruang Lingkup Topik
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Filsafat</strong> (pemikiran Islam, filsafat umum,
                etika, epistemologi, filsafat sosial)
              </li>
              <li>
                <strong>Agama</strong> (keislaman, dakwah, pemikiran keagamaan,
                tafsir sosial)
              </li>
              <li>
                <strong>Sains</strong> (sains & masyarakat, sains dan agama,
                teknologi, pendidikan)
              </li>
              <li>
                <strong>Politik</strong> (politik kebangsaan, demokrasi,
                kebijakan publik, politik Islam)
              </li>
            </ul>
          </div>

          <div className="border-t pt-4 text-slate-600">
            <p>
              Status awal artikel adalah <strong>pending</strong> dan akan
              ditinjau oleh editor sebelum dipublikasikan.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

