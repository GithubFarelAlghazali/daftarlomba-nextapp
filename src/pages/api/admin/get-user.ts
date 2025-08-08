// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "@/lib/firebase/service";

type Data = {
	status: boolean;
	statusCode: number;
	data: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const data = await getUsers();
	res.status(200).json({ statusCode: 200, status: true, data });
}
