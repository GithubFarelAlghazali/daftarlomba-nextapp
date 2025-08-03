import Navbar from "@/components/Navbar/index";
import { signIn } from "next-auth/react";

export default function Home() {
  const bidangLomba = [
    {
      title: "Desain Poster",
      desc: "Tunjukkan kreativitasmu melalui poster bertema kemerdekaan."
    },
    {
      title: "Video Kemerdekaan",
      desc: "Buat video pendek yang mengangkat nilai perjuangan dan nasionalisme."
    },
    {
      title: "Menyanyi Lagu Nasional",
      desc: "Persembahkan lagu nasional dengan aransemen musik modern."
    }
  ];

  const timeline = [
    {
      tanggal: "1 - 10 Agustus 2025",
      kegiatan: "Pendaftaran Peserta"
    },
    {
      tanggal: "11 - 16 Agustus 2025",
      kegiatan: "Pengumpulan Karya"
    },
    {
      tanggal: "17 Agustus 2025",
      kegiatan: "Penilaian dan Pengumuman Pemenang"
    }
  ];

  return (
    <>
     <Navbar/>

      <main className="bg-white text-gray-800 *:scroll-mt-7">
        <section className=" text-white  text-center bg-[url('/bg.jpg')]  bg-cover bg-no-repeat" >
          <div className=" py-40 bg-[rgb(0,0,0,0.5)] w-full h-full px-2">
            <h1 className=" text-3xl md:text-5xl font-bold mb-4">
              Semarak Kemerdekaan - HUT RI 80
            </h1>
            <p className="text-lg md:text-xl">
              Rayakan Hari Kemerdekaan dengan kreativitas dan semangat juang!
            </p>
            <button className="bg-red-800 p-2 rounded-md mt-5 md:hidden" onClick={()=>{signIn()}}>Daftar sekarang!</button>
          </div>
        </section>

        <section className="py-16 px-6 bg-white max-w-5xl mx-auto" id="overview">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Tentang Acara</h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto">
            Dalam rangka memperingati Hari Ulang Tahun Republik Indonesia yang ke-80,
            kami mengadakan serangkaian lomba kreatif bagi seluruh masyarakat. Mari
            berpartisipasi, tunjukkan semangat nasionalisme dan kreativitasmu!
          </p>
        </section>

        <section className="py-16 px-6 bg-red-50" id="bidang">
          <h2 className="text-3xl font-bold text-center text-red-700 mb-10">Bidang Lomba</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bidangLomba.map((lomba, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-red-700 mb-2">{lomba.title}</h3>
                <p className="text-gray-600 text-sm">{lomba.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 bg-white" id='timeline'>
          <h2 className="text-3xl font-bold text-center text-red-700 mb-10">Timeline Lomba</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="text-red-700 font-semibold w-40">{item.tanggal}</div>
                <div className="text-gray-700">{item.kegiatan}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-red-700 text-white text-center py-6 absolute left-0 right-0 -z-10">
          <p>&copy; 2025 Panitia Lomba HUT RI 80. Merdeka!</p>
        </footer>
      </main>
    </>
  );
}
