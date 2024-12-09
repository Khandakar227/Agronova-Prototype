"use client"
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./ThemeButton";
import { CircleX, Menu } from "lucide-react";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10">
        <div className="flex px-4 shadow bg-white dark:bg-[#000f06] gap-4 justify-between items-center">
            <Link href={"/"}>
                <Image src={"/logo.png"} width={200} height={70} alt="Krishi Dishari Logo"/>
            </Link>

            <div className="hidden md:block">
                <ul className="flex gap-6 pr-4 text-sm dark:text-gray-200 items-center">
                    <li className="font-semibold"><Link href={"/"}>হোম</Link></li>
                    <li className="font-semibold group relative">
                        <Link href={"#features"}>আমাদের সেবা</Link>
                        <div className="absolute top-full left-0">
                            <div className="bg-white dark:bg-[#071a0f] rounded-lg shadow-lg hidden group-hover:block">
                                <ul>
                                    <li className="p-2 hover:bg-green-900"><Link href={"/crop-recommendation"}>ফসল পরামর্শ</Link></li>
                                    <li className="p-2 hover:bg-green-900"><Link href={"/fertilizer-suggest"}>সার পরামর্শ</Link></li>
                                    <li className="p-2 hover:bg-green-900"><Link href={"/geolocation-wise-crop"}>জিওলোকেশন ভিত্তিক ফসল</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <ThemeButton />
                </ul>
            </div>

            <div className="md:hidden z-20">
                <MobileSidebar />
            </div>
        </div>
    </div>
  )
}
