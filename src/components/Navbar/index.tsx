import Link from "../../../node_modules/next/link"

const Navbar = () => {
    return (
        <nav className="bg-red-700 text-white flex justify-between p-4 fixed top-2 left-2 right-2 rounded-md shadow-2xl">
            <h3 className="text-xl font-semibold">Semarak Kemerdekaan</h3>
            <ul className="flex justify-evenly gap-5 *:*:hover:underline *:*:hover:cursor-pointer" >
                <li>
                    <Link href='#overview'>Overview</Link>
                </li>
                <li>
                    <Link href='#bidang'>Bidang lomba</Link>
                </li>
                <li>
                    <Link href='#timeline'>Timeline</Link>
                </li>
                <li>
                    <button>Daftar</button>
                </li>
            </ul>
</nav>
        )
}

export default Navbar