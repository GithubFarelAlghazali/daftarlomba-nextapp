import { useState } from "react";

const Alert = (props: any) => {
	const { message, status } = props;
	const [isVisible, setIsVisible] = useState(true);

	if (!isVisible) {
		return null;
	}

	return (
		<div className={`text-${status === "success" ? "green" : "red"}-800 fixed top-3 left-0 right-0 flex justify-center`}>
			<div className={`p-4 ${status === "success" ? "bg-green-300" : "bg-red-200"} w-56 text-center rounded-md relative`}>
				<p>{message}</p>
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

export default Alert;
