// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getParticipants } from "@/lib/firebase/service";

type Data = {
	status: boolean;
	statusCode: number;
	data: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== "POST") {
		return res.status(405).json({ status: false, statusCode: 405, data: "Method not allowed" });
	}
	const { bidang } = req.body;

	const data = await getParticipants(bidang);
	res.status(200).json({ statusCode: 200, status: true, data });
}
