import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10">
        <div className="flex px-4 shadow bg-white gap-4 justify-between items-center">
            <Link href={"/"}>
                <Image src={"/logo.jpg"} width={200} height={70} alt="Krishi Dishari Logo"/>
            </Link>

            <div>
                <ul className="flex gap-6 pr-4 text-sm">
                    <li className="font-semibold"><Link href={"/"}>হোম</Link></li>
                    <li className="font-semibold"><Link href={"/crop-recommendation"}>ফসলের সুপারিশ</Link></li>
                    <li className="font-semibold"><Link href={"/"}>জিওলোকেশন ভিত্তিক সেবা</Link></li>
                    <li className="font-semibold"><Link href={"/"}>কৃষি সহায়ক</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
