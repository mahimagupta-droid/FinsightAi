"use client";
import Background from "../../public/homepage-img.png"
import Image from "next/image"
import Footer from "@/components/ui/footer"
import FAQs from "@/components/Accordion"
import { CardVariant } from "@/components/Card"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";

export default function HomePage() {
  const user = useAuth();
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen top-0">
      <div className="w-full min-h-screen bg-[#070b14] flex items-center justify-center px-6 lg:px-16">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src={Background}
              alt="Finance Illustration"
              className="w-[90%] max-w-md lg:max-w-lg"
              priority
            />
          </div>
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight font-playfair">
              Understand your money. <br />
              <span className="text-cyan-400">Control your future.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Your intelligent companion for tracking expenses, setting smart goals, and achieving financial freedom. Take the guesswork out of your finances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
              {user.isSignedIn? (
                <button className="px-8 py-3.5 bg-primary hover:bg-cyan-300 text-gray-900 font-semibold rounded-md transition-all">
                Get Started
              </button>
              ) : (
                <Link href="/signup" className="px-8 py-3.5 bg-primary hover:bg-cyan-300 text-gray-900 font-semibold rounded-md transition-all">
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-15 w-full">
        <CardVariant />
      </div>
      <div className="flex flex-col items-center justify-center mb-15 w-full">
        <FAQs />
      </div>
    </div>
  )
} 