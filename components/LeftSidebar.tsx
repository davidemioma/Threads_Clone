"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/lib/constants";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const router = useRouter();

  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex flex-col sticky top-0 left-0 z-20 bg-dark-2 text-light-1 h-screen w-fit pt-24 pb-5 border-r border-r-dark-4 overflow-y-auto">
      <div className="flex-1 flex flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname.includes(link.route) || pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${
                isActive && "bg-primary-500"
              } flex items-center gap-4 p-4 rounded-lg`}
            >
              <Image src={link.imgURL} width={20} height={20} alt="" />

              <p className="hidden lg:inline text-light-1">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center lg:justify-start px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex items-center p-4 gap-4 cursor-pointer">
              <Image
                className="cursor-pointer object-cover "
                src="/assets/logout.svg"
                alt="logout"
                width={22}
                height={22}
              />

              <p className="hidden lg:inline text-light-2">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default LeftSidebar;
