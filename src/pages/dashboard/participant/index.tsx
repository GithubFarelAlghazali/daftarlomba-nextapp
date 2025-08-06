import { useSession } from "next-auth/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Alert from "@/components/Alert";
import { LoadingIcon } from "../../../../public/icons";

export default function DashboardPeserta() {
	const { data }: any = useSession();
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState();
	let fileType;

	// menyesuaikan jenis file yang bisa diupload berdasarkan bidang lomba
	switch (data?.user?.bidang) {
		case "Desain Poster":
			fileType = ".pdf,.jpg,.png";
			break;
		case "Menyanyi Lagu Nasional":
			fileType = ".mp4";
			break;
		case "Video Kemerdekaan":
			fileType = ".mp4";
			break;
	}

	const handleUpload = async (e: any) => {
		e.preventDefault();
		setLoading(true);

		const form = e.target;
		const fileName = form.file.files[0]?.name;
		const sendData = {
			karya: fileName,
		};

		// kirim data & susun sesuai prosedur
		try {
			const result = await fetch("/api/upload-karya", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sendData),
			});

			const responseData = await result.json();
			if (result.status === 200) {
				setAlert({
					msg: responseData.message,
					type: "success",
				});
			} else {
				setAlert({
					msg: responseData.message,
					type: "fail",
				});
			}
			setLoading(false);
		} catch (error) {
			setAlert({
				msg: "Karya gagal diunggah",
				type: "fail",
			});
			console.error("Fetch error:", error);
			setLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Dashboard Peserta - HUT RI 80</title>
				<meta name="description" content="Dashboard peserta lomba HUT RI 80" />
			</Head>
			<Navbar />
			{alert && <Alert message={alert?.msg} status={alert?.type} />}
			<main className="min-h-screen bg-white text-gray-800 py-16 px-4 ">
				{data && (
					<div className="max-w-5xl mx-auto space-y-16">
						<h1 className="mt-12 text-3xl font-bold text-red-700">Dashboard Peserta</h1>

						<section className="bg-red-50 p-6 rounded-lg shadow">
							<h3 className="text-2xl font-bold text-red-700">Hai, {data.user.nama}.</h3>
							<p>Lengkapi langkah-langkah di bawah untuk mengikuti Lomba Semarak Kemerdekaan bidang {data.user.bidang}</p>
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
								<input type="file" accept={fileType} className="block w-full border border-gray-300 rounded px-4 py-2" id="file" required />
								<button type="submit" className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition">
									{loading ? <LoadingIcon className="size-7 text-white mx-auto" /> : "Upload"}
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
