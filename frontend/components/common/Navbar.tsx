"use client"
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10">
        <div className="flex px-4 shadow bg-white dark:bg-gray-800 gap-4 justify-between items-center">
            <Link href={"/"}>
                <Image src={"/logo.png"} width={200} height={70} alt="Krishi Dishari Logo"/>
            </Link>

            <div>
                <ul className="flex gap-6 pr-4 text-sm dark:text-gray-200">
                    <li className="font-semibold"><Link href={"/"}>হোম</Link></li>
                    <li className="font-semibold"><Link href={"/geolocation-wise-crop"}>আমাদের সেবা</Link></li>
                    <ThemeButton />
                </ul>
            </div>
        </div>
    </div>
  )
}
