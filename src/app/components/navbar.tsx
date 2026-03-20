"use client";
import Logo from "../../../public/projectLogo.png";
import Image from "next/image";
import { SignInButton, SignOutButton, UserButton, UserProfile, useUser } from "@clerk/nextjs";
export default function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className="bg-[#000000] h-30 flex items-center justify-between z-1000 border-b-2 border-accent">
      <div>
        <Image src={Logo} alt="projectLogo" className="w-50 h-25" />
      </div>
      {isSignedIn ? (
        <SignOutButton>
          <button className="bg-[#006DAA] cursor-pointer rounded-lg px-4 py-2">Sign Out</button>
        </SignOutButton>
      ) : (
        <SignInButton>
          <button className="bg-[#006DAA] cursor-pointer rounded-lg px-4 py-2">Sign In</button>
        </SignInButton>
      )}
    </div>
  )
}