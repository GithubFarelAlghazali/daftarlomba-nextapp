import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useState, useRef } from "react";

export default function DashboardPeserta() {
     const { data }: any = useSession();
     let fileType

     // handle upload karya
     const [judulKarya, setJudulKarya] = useState('')
     const fileRef= useRef<HTMLInputElement>(null)

   

     // menyesuaikan jenis file yang bisa diupload berdasarkan bidang lomba
     switch (data?.user?.bidang) {
          case 'Desain Poster':
               fileType = '.pdf,.jpg,.png'
               break;
          case 'Menyanyi Lagu Nasional':
               fileType = '.mp4'
               break;
          case 'Video Kemerdekaan':
               fileType = '.mp4'
               break;
     
          
     }

     const handleUpload = (e: any) => {
          e.preventDefault()
          const form = e.target;
          const fileName =form.file.value.split('\\')[form.file.value.split('\\').length - 1] 
          console.log(fileName)
     }

     return (
          <>
               <Head>
                    <title>Dashboard Peserta - HUT RI 80</title>
                    <meta name="description" content="Dashboard peserta lomba HUT RI 80" />
               </Head>
               <Navbar />
               <main className="min-h-screen bg-white text-gray-800 py-16 px-4 ">
                    {data && (
                         <div className="max-w-5xl mx-auto space-y-16">
                              <h1 className="mt-12 text-3xl font-bold text-red-700">Dashboard Peserta</h1>

                              <section className="bg-red-50 p-6 rounded-lg shadow">
                                   <h3 className="text-2xl font-bold text-red-700">Hai, {data.user.nama}.</h3>
                                   <p>Lengkapi langkah-langkah di bawah untuk mengikuti Lomba Semarak Kemerdekaan bidang { data.user.bidang}</p>
                              </section>

                              <section className="scroll-mt-20" id="data">
                                   <h2 className="text-2xl font-semibold text-red-700 mb-4">Kelengkapan Data Pribadi</h2>
                                   <div className="bg-red-50 p-6 rounded-lg shadow">
                                        <p className="text-gray-700 mb-2">
                                             Nama: <span className="font-medium">{data.user.nama}</span>
                                        </p>
                                        <p className="text-gray-700 mb-2">
                                             Email: <span className="font-medium">{data.user.email}</span>
                                        </p>
                                        <p className="text-gray-700">
                                             Bidang Lomba: <span className="font-medium">{data.user.bidang}</span>
                                        </p>
                                   </div>
                              </section>

                              <section className="scroll-mt-20" id="upload">
                                   <h2 className="text-2xl font-semibold text-red-700 mb-4">Upload Karya</h2>
                                   <form className="bg-red-50 p-6 rounded-lg shadow space-y-4" onSubmit={handleUpload}>
                                        <label className="block text-gray-700 font-medium">Unggah file karya kamu ({fileType}):</label>
                                        <input type="file" accept={fileType} className="block w-full border border-gray-300 rounded px-4 py-2" id='file' />
                                        <button type="submit" className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition">
                                             Upload
                                        </button>
                                   </form>
                              </section>

                              <section className="scroll-mt-20" id="pengumuman">
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
