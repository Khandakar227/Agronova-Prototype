"use client"
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./ThemeButton";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
    return (
        <div className="sticky top-0 z-10">
            <div className="flex px-4 shadow bg-white dark:bg-[#000f06] gap-4 justify-between items-center h-14">
                <Link href={"/"}>
                    <Image src={"/agro-logo.PNG"} width={200} height={70} alt="Agro Nova Logo" />
                </Link>

                <div className="hidden md:block">
                    <ul className="flex gap-6 pr-4 text-sm dark:text-gray-200 items-center">
                        <li className="font-semibold"><Link href={"/"}>Home</Link></li>
                        <li className="font-semibold group relative">
                            <Link href={"#features"}>Our Services</Link>
                            <div className="absolute top-full left-[-5px]">
                                <div className="bg-white w-52 dark:bg-[#071a0f] rounded-lg shadow-lg hidden group-hover:block">
                                    <ul>
                                        <li className="p-2 hover:bg-green-200 hover:rounded-md hover:dark:bg-green-900"><Link href={"/geolocation-wise-crop"}>Geolocation-based Crops</Link></li>
                                        <li className="p-2 hover:bg-green-200 hover:rounded-md hover:dark:bg-green-900"><Link href={"/crop-recommendation"}>Crop Recommendation</Link></li>
                                        <li className="p-2 hover:bg-green-200 hover:rounded-md hover:dark:bg-green-900"><Link href={"/fertilizer-suggest"}>Fertilizer Suggestion</Link></li>
                                        <li className="p-2 hover:bg-green-200 hover:rounded-md hover:dark:bg-green-900"><Link href={"/plant-disease"}>Plant Disease Detection</Link></li>
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
