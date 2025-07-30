import { signIn, signOut } from "next-auth/react";
import Link from "../../../node_modules/next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
     const path = usePathname();
     const menu = {
          homeMenu: [
               {
                    label: "Overview",
                    link: "#overview",
               },
               {
                    label: "Bidang lomba",
                    link: "#bidang",
               },
               {
                    label: "Timeline",
                    link: "#timeline",
               },
          ],
          dahsboardMenu: [
               {
                    label: "Data pribadi",
                    link: "#data",
               },
               {
                    label: "Upload karya",
                    link: "#upload",
               },
               {
                    label: "Pengumuman",
                    link: "#pengumuman",
               },
          ],
     };
     return (
          <nav className="bg-red-700 text-white flex justify-between p-4 fixed top-2 left-2 right-2 rounded-md shadow-2xl">
               <h3 className="text-xl font-semibold">Semarak Kemerdekaan</h3>
               <ul className="flex justify-evenly gap-5 *:*:hover:underline *:*:hover:cursor-pointer">
                    {path === "/"
                         ? menu.homeMenu.map((item, index) => (
                                <li key={index}>
                                     <Link href={item.link}>{item.label}</Link>
                                </li>
                           ))
                         : menu.dahsboardMenu.map((item, index) => (
                                <li key={index}>
                                     <Link href={item.link} key={index}>
                                          {item.label}
                                     </Link>
                                </li>
                           ))}
                    <li>{path === "/" ? <button onClick={() => signIn()}>Daftar</button> : <button onClick={() => signOut({ callbackUrl: "/" })}>LogOut</button>}</li>
               </ul>
          </nav>
     );
};

export default Navbar;
