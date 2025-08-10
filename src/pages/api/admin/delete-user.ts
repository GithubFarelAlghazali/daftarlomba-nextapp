// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteUser } from "@/lib/firebase/service";
import { getToken } from "next-auth/jwt";

type Data = {
	status: boolean;
	message: string;
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	// cek apakah method yang digunakan adalah POST
	if (req.method !== "POST") {
		return res.status(405).json({ status: false, message: "Method not allowed" });
	}

	const token = await getToken({ req, secret });
	if (!token || token.role !== "admin") {
		return res.status(403).json({ status: false, message: "Forbidden" });
	}

	const { userId } = req.body;

	// masukkan data peserta ke database
	await deleteUser(userId, (response) => {
		if (response.status) {
			res.status(200).json({ status: true, message: response.message });
		} else {
			res.status(500).json({ status: false, message: response.message });
		}
	});
}
