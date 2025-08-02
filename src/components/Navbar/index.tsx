import { signIn, signOut } from "next-auth/react";
import Link from "../../../node_modules/next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
          participantMenu: [
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
          juriMenu: [
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
          adminMenu: [
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

     let navMenu;

     switch (path) {
          case "/":
               navMenu = menu.homeMenu;
               break;
          case "/dashboard/participant":
               navMenu = menu.participantMenu;
               break;
          case "/dashboard/juri":
               navMenu = menu.juriMenu;
               break;
          case "/dashboard":
               navMenu = menu.juriMenu;
               break;
     }

     const [isOpen, setIsOpen] = useState(false);

     return (
          <nav className="bg-red-700 text-white flex justify-between p-4 fixed top-2 left-2 right-2 rounded-md shadow-2xl">
               <h3 className="text-xl font-semibold">Semarak Kemerdekaan</h3>
               <ul className=" justify-evenly items-center gap-5 *:*:hover:underline *:*:hover:cursor-pointer hidden md:flex">
                    {navMenu.map((item, index) => (
                         <li key={index}>
                              <Link href={item.link}>{item.label}</Link>
                         </li>
                    ))}
                    <li className="bg-white p-2 text-red-800 rounded-sm">{path === "/" ? <button onClick={() => signIn()}>Daftar</button> : <button onClick={() => signOut({ callbackUrl: "/" })}>LogOut</button>}</li>
               </ul>
               {/* mobile view */}
               <div
                    id="toggle"
                    onClick={() => {
                         isOpen ? setIsOpen(false) : setIsOpen(true);
                    }}
                    className={`cursor-pointer size-8 ${isOpen ? '*:bg-red-800' : '*:bg-white'} z-30 *:w-full *:h-1 flex flex-col justify-evenly rounded-md *:transition-all *:duration-300 md:hidden`}
               >
                    <span className={ `${isOpen && "rotate-45 origin-top-left"}`}></span>
                    <span className={`${isOpen && "opacity-0"}`}></span>
                    <span className={`${isOpen && "-rotate-45 origin-top-left translate-y-1 -translate-x-[1px]"}`}></span>
               </div>
               <ul className={`${isOpen ? "translate-x-0" : 'translate-x-[100vw]' } transition-all duration-300 fixed top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,0.8)] text-slate-700 font-semibold  justify-center items-center gap-5 *:*:hover:underline *:*:hover:cursor-pointer flex flex-col md:hidden z-20`}>
                    {navMenu.map((item, index) => (
                         <li key={index}>
                              <Link href={item.link}>{item.label}</Link>
                         </li>
                    ))}
                    <li className="bg-red-800 text-white  md:bg-white px-4 py-2 md:p-2 md:text-red-800 rounded-md ">
                         {path === "/" ? <button onClick={() => signIn()}>Daftar</button> : <button onClick={() => signOut({ callbackUrl: "/" })}>Keluar</button>}
                    </li>
               </ul>
          </nav>
     );
};

export default Navbar;
