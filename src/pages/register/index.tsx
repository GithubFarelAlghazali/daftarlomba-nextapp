import { useRouter } from "next/router";
import Head from "next/head";
import Link from "../../../node_modules/next/link";
import { useState } from "react";
import Alert from "../../components/Alert";
import { LoadingIcon } from "../../../public/icons";

export default function Register() {
     const { push } = useRouter();
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e: any) => {
          //  tangkap data formulir
          e.preventDefault();
          setLoading(true);
          const form = e.target;
          const data = {
               nama: form.nama.value,
               email: form.email.value,
               password: form.password.value,
               bidang: form.bidang.value,
          };

          // kirim data & susun sesuai prosedur
          const result = await fetch("api/register", {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify(data),
          });

          // cek keberhasilan
          if (result.status === 200) {
               form.reset();
               push("/login");
          } else {
               setError(result.status === 400 ? "Email telah terdaftar" : "Terjadi kesalahan saat mendaftar");
               setLoading(false);
          }
     };

     return (
          <>
               <Head>
                    <title>Pendaftaran Peserta - HUT RI 80</title>
                    <meta name="description" content="Dashboard peserta lomba HUT RI 80" />
               </Head>
               <main className="min-h-screen bg-white text-gray-800 py-20 px-4 ">
                    <div className="max-w-sm mx-auto relative">
                         {error && <Alert message={error} />}
                         <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">Daftar Akun</h1>
                         <p className="text-center pb-10">
                              Sudah punya akun?{" "}
                              <Link href="/login" className="underline">
                                   LogIn
                              </Link>{" "}
                         </p>

                         <form onSubmit={handleSubmit} className="space-y-3 bg-red-50 p-8 rounded-xl shadow">
                              <div>
                                   <label htmlFor="nama" className="block font-semibold text-red-700 mb-1">
                                        Nama
                                   </label>
                                   <input type="text" id="nama" name="nama" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700 bg-white" required />
                              </div>

                              <div>
                                   <label htmlFor="email" className="block font-semibold text-red-700 mb-1">
                                        Email
                                   </label>
                                   <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700 bg-white" required />
                              </div>

                              <div>
                                   <label htmlFor="password" className="block font-semibold text-red-700 mb-1">
                                        Password
                                   </label>
                                   <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700 bg-white" required />
                              </div>

                              <div>
                                   <label htmlFor="bidang" className="block font-semibold text-red-700 mb-1">
                                        Pilih Bidang Lomba
                                   </label>
                                   <select id="bidang" name="bidang" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700">
                                        <option value="Desain Poster">Desain Poster</option>
                                        <option value="Video Kemerdekaan">Video Kemerdekaan</option>
                                        <option value="Menyanyi Lagu Nasional">Menyanyi Lagu Nasional</option>
                                   </select>
                              </div>

                              <button type="submit" disabled={loading} className="w-full bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition">
                                   {loading ? <LoadingIcon className="size-7 text-white mx-auto" /> : "Daftar"}
                              </button>
                         </form>
                    </div>
               </main>
          </>
     );
}
