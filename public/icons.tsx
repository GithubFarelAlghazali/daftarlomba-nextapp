export const LoadingIcon = (props) => {
	const { className } = props;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" className={`${className} fill-current animate-spin`}>
			<path d="M480-80q-83 0-156-31.5t-127-86Q143-252 111.5-325T80-480q0-157 104-270t256-128v120q-103 14-171.5 92.5T200-480q0 116 82 198t198 82q66 0 123.5-28t96.5-76l104 60q-54 75-139 119.5T480-80Zm366-238-104-60q9-24 13.5-49.5T760-480q0-107-68.5-185.5T520-758v-120q152 15 256 128t104 270q0 44-8 85t-26 77Z" />
		</svg>
	);
};

export const DeleteIcon = (props) => {
	const { className } = props;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" className={`${className} fill-current`}>
			<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
		</svg>
	);
};
