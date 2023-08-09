import React from "react";
import Link from "next/link";
import Image from "next/image";
import { dark } from "@clerk/themes";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-30 flex items-center gap-2 justify-between bg-dark-2 py-3 px-6 border-b border-b-dark-4">
      <Link href="/" className="flex items-center gap-3 flex-shrink-0">
        <Image src="/logo.svg" width={28} height={28} alt="Logo" />

        <p className="hidden sm:inline font-extrabold text-light-1">Threads</p>
      </Link>

      <div className="flex items-center gap-2">
        <div className="md:hidden flex-shrink-0">
          <SignedIn>
            <SignOutButton>
              <Image
                className="cursor-pointer object-cover "
                src="/assets/logout.svg"
                alt="logout"
                width={22}
                height={22}
              />
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
