import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function DashboardJuri() {
	const { data }: any = useSession();
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		if (!data?.user?.bidang) return; // Tunggu sampai session siap

		const fetchData = async () => {
			const payload = {
				bidang: data?.user?.bidang,
			};
			try {
				const response = await fetch("/api/get-participants", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});
				const result = await response.json();
				setParticipants(result.data);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchData();
	}, []);

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
							<table className="bg-white border-gray-300 border rounded-lg p-6 text-center  w-full">
								<tr className="bg-red-50 sticky *:p-3 *:border-gray-200  *:border-1 top-20 outline-1 outline-gray-200">
									<th>No.</th>
									<th>Nama</th>
									<th>Email</th>
									<th>Karya</th>
								</tr>
								{participants.length > 0 ? (
									participants.map((item, index) => {
										return (
											<tr key={index} className=" *:border-1 *:border-gray-300 *:p-6">
												<td>{index + 1}</td>
												<td>{item.nama}</td>
												<td>{item.email}</td>
												<td>{item.karya}</td>
											</tr>
										);
									})
								) : (
									<tr>
										<td colSpan={4} className="p-6">
											Peserta belum mengirim hasil karya
										</td>
									</tr>
								)}
							</table>
						</section>
					</div>
				)}
			</main>
		</>
	);
}
