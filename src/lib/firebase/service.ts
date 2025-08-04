import { getFirestore, getDocs, collection, where, query, addDoc } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function signUp(
     userData: {
          email: string;
          nama: string;
          password: string;
          bidang: string;
          role?: string;
     },
     callback: (response: { status: boolean; message: string }) => void
) {
     // ambil data sesuai email
     const q = query(collection(firestore, "users"), where("email", "==", userData.email));
     const snapshot = await getDocs(q);
     const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));

     // cek apakah email sudah terdaftar
     if (data.length > 0) {
          callback({
               status: false,
               message: "Email sudah terdaftar",
          });
     } else {
          //  jika tidak maka tambah data ke database
          userData.password = await bcrypt.hash(userData.password, 10);
          userData.role = "participant";
          await addDoc(collection(firestore, "users"), userData)
               .then(() => {
                    callback({
                         status: true,
                         message: "Pendaftaran berhasil!",
                    });
               })
               .catch((error) => {
                    callback({
                         status: false,
                         message: error,
                    });
               });
     }
}

export async function signIn(userData: { email: string }) {
     // ambil data email
     const q = query(collection(firestore, "users"), where("email", "==", userData.email));
     const snapshot = await getDocs(q);
     const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));

     // cek apakah email sudah terdaftar
     if (data.length > 0) {
          return data[0];
     } else {
          return null;
     }
}

export async function addParticipant(
     userData: {
          email: string;
          nama: string;
          bidang: string;
          karya: string;
     },
     callback: (response: { status: boolean; message: string }) => void
) {
      await addDoc(collection(firestore, "participants"), userData)
               .then(() => {
                    callback({
                         status: true,
                         message: "Pendaftaran peserta berhasil!",
                    });
               })
               .catch((error) => {
                    callback({
                         status: false,
                         message: error,
                    });
               });
}

export async function getParticipants(bidang : string) {
     // const snapshot = await getDocs(collection(firestore, 'users'), where('bidang','==',bidang));
     const q = query(collection(firestore, "users"), where("bidang", "==", bidang));
     const snapshot = await getDocs(q)
     const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));
     return data;
}
