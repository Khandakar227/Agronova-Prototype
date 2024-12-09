"use client"
import { CircleX, Menu } from "lucide-react";
import ThemeButton from "./ThemeButton";
import Link from "next/link";
import { useState } from "react";
import { motion } from 'framer-motion';

export default function MobileSidebar() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <ThemeButton />
        <button onClick={() => setShow(true)}>
          <Menu />
        </button>
      </div>
      <motion.div
        animate={{ width: show ? 200 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 p-4 bg-white dark:bg-[#20251f] dark:text-gray-100 min-h-screen min-w-48">
          <div className="pt-2 pb-8 flex justify-end">
            <button onClick={() => setShow(false)}>
              <CircleX />
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            <li className="font-semibold hover:bg-green-800">
              <Link className="p-1 block" href={"/"}>হোম</Link>
            </li>
            <li className="font-semibold hover:bg-green-800">
              <Link className="p-1 block" href={"/crop-recommendation"}>ফসল পরামর্শ</Link>
            </li>
            <li className="font-semibold hover:bg-green-800">
              <Link className="p-1 block" href={"/fertilizer-suggest"}>সার পরামর্শ</Link>
            </li>
            <li className="font-semibold hover:bg-green-800">
              <Link className="p-1 block" href={"/geolocation-wise-crop"}>জিওলোকেশন ভিত্তিক ফসল</Link>
            </li>
          </ul>
        </motion.div>
    </>
  );
}
