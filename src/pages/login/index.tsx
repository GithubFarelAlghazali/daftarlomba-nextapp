import Link from "../../../node_modules/next/link";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Simpan ke database atau kirim API di sini
  };

  return (
    <>
     
      <main className="min-h-screen bg-white text-gray-800 py-20 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">Formulir Pendaftaran</h1>
            <p className="text-center pb-10">Belum punya akun? <Link href='/register' className="underline">Buat akun</Link> </p>
                  
          <form onSubmit={handleSubmit} className="space-y-6 bg-red-50 p-8 rounded-xl shadow">
           
            <div>
              <label htmlFor="email" className="block font-semibold text-red-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-semibold text-red-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
            </div>

          
            <button
              type="submit"
              className="w-full bg-red-700 text-white font-semibold py-2 rounded hover:bg-red-800 transition"
            >
              LogIn
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
