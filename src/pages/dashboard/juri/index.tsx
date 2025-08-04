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
                                   <p>Anda ditugaskan sebagai juri bidang lomba {data.user.bidang}. Berikut daftar karya yang telah masuk, berikan penilaian secara jujur & adil.</p>
                              </section>

                              <section>
                                   <h2 className="text-2xl font-semibold text-red-700 mb-4">Daftar Karya</h2>
                                   <table className="bg-white border-gray-300 border rounded-lg p-6 text-center  w-full" >
                                        <tr className="bg-red-50">
                                             <th>No.</th>
                                             <th>Nama</th>
                                             <th>Email</th>
                                             <th>Karya</th>
                                        </tr>
                                        <tr>
                                             <td>1</td>
                                             <td>Dimas</td>
                                             <td>dimas@mail.id</td>
                                             <td>poster.jpg</td>
                                        </tr>
                                        <tr>
                                             <td>2</td>
                                             <td>Dimas</td>
                                             <td>dimas@mail.id</td>
                                             <td>poster.jpg</td>
                                        </tr>
                                   </table>
                              </section>
                         </div>
                    )}
               </main>
          </>
     );
}
