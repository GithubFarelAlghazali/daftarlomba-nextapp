import { useState } from "react";

const Confirm = (props: any) => {
	const { message, onConfirm, onCancel } = props;
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) {
		return null;
	}

	return (
		<div className="text-slate-800 fixed top-3 left-0 right-0 flex justify-center">
			<div className={`p-5 bg-white w-72 text-center rounded-md relative`}>
				{/* <p>{message}</p> */}
				<p>Anda yakin ingin menghapus user?</p>
				<div className="flex gap-5 mt-4 *:px-3 *:py-1 *:rounded-sm *:cursor-pointer">
					<button onClick={onConfirm} className="border-1 border-red-700">
						Yakin
					</button>
					<button onClick={onCancel} className="bg-red-700 text-white">
						Batal
					</button>
				</div>
				<button
					className=" text-slate-900 text-xl rounded-sm absolute bottom-2 right-2 cursor-pointer"
					onClick={() => {
						setIsVisible(false);
					}}
				>
					×
				</button>
			</div>
		</div>
	);
};

export default Confirm;
