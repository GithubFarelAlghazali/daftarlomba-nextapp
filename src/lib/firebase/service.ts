import { getFirestore, getDocs, collection, where, query, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

// auth services
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

// participants service
export async function addParticipant(
	userData: {
		email: string;
		nama: string;
		bidang: string;
		karya: string;
	},
	callback: (response: { status: boolean; message: string }) => void
) {
	// ambil data sesuai email
	const q = query(collection(firestore, "participants"), where("email", "==", userData.email));
	const snapshot = await getDocs(q);
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	// cek apakah email sudah terdaftar
	if (data.length > 0) {
		// jika sudah maka update karya nya
		const docId = data[0].id;
		const docRef = doc(firestore, "participants", docId);
		await updateDoc(docRef, userData)
			.then(() => {
				callback({
					status: true,
					message: "Karya berhasil diupdate!",
				});
			})
			.catch((error) => {
				callback({
					status: false,
					message: error,
				});
			});
	} else {
		await addDoc(collection(firestore, "participants"), userData)
			.then(() => {
				callback({
					status: true,
					message: "Karya berhasil diunggah!",
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

// juri services
export async function getParticipants(bidang: string) {
	const q = query(collection(firestore, "participants"), where("bidang", "==", bidang));
	const snapshot = await getDocs(q);
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return data;
}

// admin services
export async function getUsers() {
	const q = query(collection(firestore, "users"));
	const snapshot = await getDocs(q);
	const data = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
	return data;
}

export async function editRole(
	userData: {
		email: string;
		role: string;
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
		// jika sudah maka update role nya
		const docId = data[0].id;
		const docRef = doc(firestore, "users", docId);
		await updateDoc(docRef, { role: userData.role })
			.then(() => {
				callback({
					status: true,
					message: "Role berhasil diuapdate",
				});
			})
			.catch((error) => {
				callback({
					status: false,
					message: error,
				});
			});
	} else {
		callback({
			status: false,
			message: "Role gagal diuapdate",
		});
	}
}

export async function deleteUser(userId: string, callback: (response: { status: boolean; message: string }) => void) {
	const docRef = doc(firestore, "users", userId);
	await deleteDoc(docRef)
		.then(() => {
			callback({
				status: true,
				message: "User berhasil dihapus",
			});
		})
		.catch((error) => {
			callback({
				status: false,
				message: error,
			});
		});
}
