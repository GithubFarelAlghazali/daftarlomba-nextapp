import { useRouter } from "next/router";
import Head from "next/head";
import Link from "../../../node_modules/next/link";
import { useState } from "react";
import Alert from "../../components/Alert";
import { LoadingIcon } from "../../../public/icons";
import { signIn } from "next-auth/react";

export default function Register() {
     const { push, query } = useRouter();
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e: any) => {
          //  tangkap data formulir
          e.preventDefault();
          setLoading(true);
          const form = e.target;
          const data = {
               email: form.email.value,
               password: form.password.value,
          };

          const callbackUrl: string = "/dashboard";

          try {
               const res = await signIn("credentials", {
                    redirect: false,
                    email: data.email,
                    password: data.password,
                    callbackUrl,
               });
               if (!res?.error) {
                    setLoading(false);
                    push(callbackUrl);
               } else {
                    setLoading(false);
                    setError("Email atau password tidak sesuai");
               }
          } catch (error: any) {
               setLoading(false);
               setError("Email atau password tidak sesuai");
          }
     };

     return (
          <>
               <Head>
                    <title>Pendaftaran Peserta - HUT RI 80</title>
                    <meta name="description" content="Dashboard peserta lomba HUT RI 80" />
               </Head>
               <main className="min-h-screen bg-white text-gray-800 py-20 px-4 ">
                    <div className="max-w-md mx-auto relative">
                         {error && <Alert message={error} />}
                         <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">Formulir Pendaftaran</h1>
                         <p className="text-center pb-10">
                              Belum punya akun?{" "}
                              <Link href="/register" className="underline">
                                   Buat Akun
                              </Link>{" "}
                         </p>

                         <form onSubmit={handleSubmit} className="space-y-3 bg-red-50 p-8 rounded-xl shadow">
                              <div>
                                   <label htmlFor="email" className="block font-semibold text-red-700 mb-1">
                                        Email
                                   </label>
                                   <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700" required />
                              </div>

                              <div>
                                   <label htmlFor="password" className="block font-semibold text-red-700 mb-1">
                                        Password
                                   </label>
                                   <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700" required />
                              </div>

                              <button type="submit" disabled={loading} className="w-full bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition">
                                   {loading ? <LoadingIcon className="size-7 text-white mx-auto" /> : "LogIn"}
                              </button>
                         </form>
                    </div>
               </main>
          </>
     );
}
