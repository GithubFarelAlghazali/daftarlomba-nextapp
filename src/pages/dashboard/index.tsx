import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function DashboardAdmin() {
	const { data }: any = useSession();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/admin/get-user");
				const result = await response.json();
				setUsers(result.data);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchData();
	}, []);

	const handleUpload = async (newRole: string, targetEmail: string) => {
		try {
			const result = await fetch("/api/admin/edit-role", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: targetEmail,
					role: newRole,
				}),
			});

			const responseData = await result.json();
			if (result.ok) {
				console.log("Role berhasil diubah:", responseData.message);
			} else {
				console.log("Gagal mengubah role:", responseData.message);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	return (
		<>
			<Head>
				<title>Dashboard Admin - HUT RI 80</title>
				<meta name="description" content="Dashboard peserta lomba HUT RI 80" />
			</Head>
			<Navbar />
			<main className="min-h-screen bg-white text-gray-800 py-16 px-4">
				{data && (
					<div className="max-w-5xl mx-auto space-y-16">
						<h1 className="mt-12 text-3xl font-bold text-red-700">Dashboard Admin</h1>

						<section className="bg-red-50 p-6 rounded-lg shadow">
							<h3 className="text-2xl font-bold text-red-700">Dahsboard Admin</h3>
							<p>Anda dapat melihat daftar peserta yang telah mendaftar pada lomba HUT RI 80. Silakan pilih bidang lomba yang ingin Anda lihat.</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-red-700 mb-4">Daftar Pengguna</h2>
							<table className="bg-white   border-gray-300 border  p-6 text-center  w-full overflow-x-auto ">
								<tr className="bg-red-50 sticky *:p-3 *:border-gray-200 *:border *:border-1 top-20 outline-1 outline-gray-200">
									<th>No.</th>
									<th>Nama</th>
									<th>Email</th>
									<th>Role</th>
								</tr>
								{users.length > 0 ? (
									users.map((item, index) => {
										return (
											<tr key={index} className="*:border *:border-1 *:border-gray-300 *:p-6">
												<td>{index + 1}</td>
												<td>{item.nama}</td>
												<td>{item.email}</td>
												<td>
													<select
														name="role"
														id="role"
														value={item.role}
														onChange={(e) => {
															handleUpload(e.target.value, item.email);
														}}
													>
														<option value="admin">admin</option>
														<option value="participant">participant</option>
														<option value="juri">juri</option>
													</select>
												</td>
											</tr>
										);
									})
								) : (
									<tr>
										<td colSpan={4}></td>
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
