"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="md:hidden fixed bottom-0 inset-x-0 z-10 bg-glassmorphism p-4 backdrop-blur-lg rounded-t-3xl">
      <div className="flex items-center justify-between gap-3">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${
                isActive && "bg-primary-500"
              } flex flex-col items-center gap-2 p-2 sm:p-2.5 rounded-lg`}
            >
              <Image src={link.imgURL} width={20} height={20} alt="" />

              <p className="hidden sm:inline text-sm text-subtle-medium text-light-1">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
