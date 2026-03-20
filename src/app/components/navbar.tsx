"use client";
import Logo from "../../../public/projectLogo.png";
import Image from "next/image";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "User Profile", path: "/user-profile" },
    { name: "Transactions", path: "/add-transactions" },
  ];

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-linear-to-r from-black via-[#001f2f] to-black border-b border-white/10 pl-2 pr-8 flex items-center justify-between h-30">

      {/* 🔷 Logo */}
      <div className="flex items-center">
        <Image
          src={Logo}
          alt="projectLogo"
          className="w-52 h-auto object-contain drop-shadow-[0_0_6px_rgba(0,212,255,0.4)]"
        />
      </div>

      {/* 🔗 Nav Links */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`relative text-sm font-medium transition-all duration-300 
              ${pathname === link.path ? "text-cyan-400" : "text-white/80 hover:text-cyan-300"}`}
          >
            {link.name}

            {/* 🔥 Active underline */}
            {pathname === link.path && (
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-cyan-400 rounded-full"></span>
            )}
          </Link>
        ))}
      </div>

      {/* 🔘 Auth Buttons */}
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <SignOutButton>
              <button className="px-4 py-2 rounded-full text-sm font-medium bg-linear-to-r from-cyan-400 to-blue-500 text-black hover:scale-105 transition-all duration-300 shadow-md hover:shadow-cyan-500/30">
                Log Out
              </button>
            </SignOutButton>
            <UserButton/>
          </>
        ) : (
          <SignInButton>
            <button className="px-5 py-2 rounded-full text-sm font-medium bg-linear-to-r from-cyan-400 to-blue-500 text-black hover:scale-105 transition-all duration-300 shadow-md hover:shadow-cyan-500/30">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}