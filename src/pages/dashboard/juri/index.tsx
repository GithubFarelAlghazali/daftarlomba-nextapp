import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function DashboardJuri() {
     const { data }: any = useSession();

     return (
          <>
               <Head>
                    <title>Dashboard Juri - HUT RI 80</title>
                    <meta name="description" content="Dashboard peserta lomba HUT RI 80" />
               </Head>
               <Navbar />
               <main className="min-h-screen bg-white text-gray-800 py-16 px-4">
                    {data && (
                         <div className="max-w-5xl mx-auto space-y-16">
                              <h1 className="mt-12 text-3xl font-bold text-red-700">Dashboard Juri</h1>

                              <section className="bg-red-50 p-6 rounded-lg shadow">
                                   <h3 className="text-2xl font-bold text-red-700">
                                        Selamat datang, {data.user.nama} - Juri {data.user.bidang}
                                   </h3>
                                   <p>Lengkapi langkah-langkah di bawah untuk mengikuti Lomba Semarak Kemerdekaan bidang Desain Poster</p>
                              </section>

                              <section>
                                   <h2 className="text-2xl font-semibold text-red-700 mb-4">Upload Karya</h2>
                                   <form className="bg-red-50 p-6 rounded-lg shadow space-y-4">
                                        <label className="block text-gray-700 font-medium">Unggah file karya kamu (PDF, MP4, MP3):</label>
                                        <input type="file" accept=".pdf,.mp4,.mp3" className="block w-full border border-gray-300 rounded px-4 py-2" />
                                        <button type="submit" className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition">
                                             Upload
                                        </button>
                                   </form>
                              </section>

                              <section>
                                   <h2 className="text-2xl font-semibold text-red-700 mb-4">Pengumuman Hasil</h2>
                                   <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
                                        <p className="text-gray-700">
                                             Hasil lomba akan diumumkan pada <span className="font-semibold">17 Agustus 2025</span>. Tetap semangat!
                                        </p>
                                   </div>
                              </section>
                         </div>
                    )}
               </main>
          </>
     );
}
