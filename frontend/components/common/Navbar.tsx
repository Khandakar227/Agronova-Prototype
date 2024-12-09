"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.replace(theme, newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <div className="sticky top-0 z-10">
        <div className="flex px-4 shadow bg-white dark:bg-gray-800 gap-4 justify-between items-center">
            <Link href={"/"}>
                <Image src={"/logo.jpg"} width={200} height={70} alt="Krishi Dishari Logo"/>
            </Link>

            <div>
                <ul className="flex gap-6 pr-4 text-sm dark:text-gray-200">
                    <li className="font-semibold"><Link href={"/"}>হোম</Link></li>
                    <li className="font-semibold"><Link href={"/crop-recommendation"}>ফসলের সুপারিশ</Link></li>
                    <li className="font-semibold"><Link href={"/geolocation-wise-crop"}>জিওলোকেশন ভিত্তিক সেবা</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
