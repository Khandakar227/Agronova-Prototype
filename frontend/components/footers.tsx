import Link from "next/link";
import { IconType } from "react-icons";
import { BsGithub } from "react-icons/bs";

const navigation:{ name:string, href: string, icon: IconType}[] = [

];

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        {/* Social Links */}
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} KrishiDishari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
