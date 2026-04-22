"use client";
import Logo from "../../../public/projectLogo.png";
import Image from "next/image";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-background/85 dark:bg-neutral-950/80 border-b border-border pl-2 pr-8 flex items-center justify-between h-30 transition-colors duration-300">
      <div className="flex items-center">
        <div>
          <Image
            src={Logo}
            alt="projectLogo"
            className="w-52 h-auto object-contain dark:invert-0 invert"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link className="relative text-md font-lato transition-all duration-300 
             text-textColor/80 hover:text-primary dark:hover:text-cyan-300" href="/">
          Home
        </Link>
        <Link className="relative text-md font-lato transition-all duration-300 
              text-textColor/80 hover:text-primary dark:hover:text-cyan-300" href="/user-profile">
          User Profile
        </Link>
        <Link className="relative text-md font-lato transition-all duration-300 
              text-textColor/80 hover:text-primary dark:hover:text-cyan-300" href="/transactions">
          Transactions
        </Link>
        <Link className="relative text-md font-lato transition-all duration-300 
              text-textColor/80 hover:text-primary dark:hover:text-cyan-300" href="/dashboard">
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isSignedIn ? (
          <>
            <SignOutButton>
              <button className="px-4 py-2 rounded-full text-md font-lato bg-primary text-primary-textColor hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-primary/30">
                Log Out
              </button>
            </SignOutButton>
            <UserButton />
          </>
        ) : (
          <SignInButton>
            <button className="px-5 py-2 rounded-full text-md font-lato bg-primary text-primary-textColor hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-primary/30">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </div >
  );
} 