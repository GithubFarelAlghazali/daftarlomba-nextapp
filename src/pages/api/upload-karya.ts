// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addParticipant } from "@/lib/firebase/service";
import { getToken } from "next-auth/jwt";

type Data = {
    status: boolean;
    message:string
};

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    // cek apakah method yang digunakan adalah POST
    if (req.method !== "POST") {
        return res.status(405).json({status:false, message: 'Method not allowed'})
    }
    
    const token = await getToken({ req, secret })
    console.log('token: ', token)
    // cek kesesuaian token dan role
    if (!token || token.role !== 'participant') {
        return res.status(401).json({status:false, message: 'Unauthorized'})
    }
    
    const { karya } = req.body
    console.log('karya: ', karya)
    // cek tipe data karya
    if (!karya || typeof karya !== "string") {
        return res.status(400).json({status:false, message: 'Nama karya harus diisi!'})
    }
    
    const userData = {
        email: token.email as string,
        nama: token.nama as string,
        bidang: token.bidang as string,
        karya
    }
    
    console.log('data yg akan dikirim: ', userData)
    
    // masukkan data peserta ke database
    await addParticipant(userData, (response) => {
        console.log('response addParticipant: ', response)
        if (response.status) {
            res.status(200).json({ status: true, message: 'Karya berhasil dikirim' })  
        } else {
            res.status(500).json({status:false, message: response.message})
        }
    })
}
