"use client";
import Logo from "../../../public/projectLogo.png";
import Image from "next/image";
import { SignInButton, SignOutButton, UserButton, useUser, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const { userId } = useAuth();
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-linear-to-r from-black via-[#021118] to-black border-b border-white/10 pl-2 pr-8 flex items-center justify-between h-30">
      <div className="flex items-center">
        <div>
          {userId ? (
            <Link href="/">
              <Image
                src={Logo}
                alt="projectLogo"
                className="w-52 h-auto object-contain"
              />
            </Link>
          ) : (
            <Link href="/user-profile">
              <Image
                src={Logo}
                alt="projectLogo"
                className="w-52 h-auto object-contain"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link className={`relative text-md font-lato transition-all duration-300 
              ${pathname === "/" ? "text-cyan-400" : "text-white/80 hover:text-cyan-300"}`} href="/">
          Home
        </Link>
        <Link className={`relative text-md font-lato transition-all duration-300 
              ${pathname === "/user-profile" ? "text-cyan-400" : "text-white/80 hover:text-cyan-300"}`} href="/user-profile">
          User Profile
        </Link>
        <Link className={`relative text-md font-lato transition-all duration-300 
              ${pathname === "/transactions" ? "text-cyan-400" : "text-white/80 hover:text-cyan-300"}`} href="/transactions">
          Transactions
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <SignOutButton>
              <button className="px-4 py-2 rounded-full text-md font-lato bg-linear-to-r from-cyan-400 to-blue-500 text-black hover:scale-105 transition-all duration-300 shadow-md hover:shadow-cyan-500/30">
                Log Out
              </button>
            </SignOutButton>
            <UserButton/>
          </>
        ) : (
          <SignInButton>
            <button className="px-5 py-2 rounded-full text-md font-lato bg-linear-to-r from-cyan-400 to-blue-500 text-black hover:scale-105 transition-all duration-300 shadow-md hover:shadow-cyan-500/30">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </div >
  );
} 