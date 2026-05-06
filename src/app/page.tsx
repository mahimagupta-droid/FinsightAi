"use client";
import Background from "../../public/homepage-img.png"
import Image from "next/image"
import FAQs from "@/components/Accordion"
import { TestimonialCard } from "@/components/TestimonialCard"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { testimonials } from "../../src/components/database/testimonials";
export default function HomePage() {
  const user = useAuth();
  return (
    <>
      <div className="w-full pt-24 pb-16 lg:pt-0 lg:pb-0 min-h-screen bg-background flex flex-col items-center justify-center px-6 lg:px-16 transition-colors duration-300 gap-8 lg:gap-16">
        <span className="text-sm md:text-base font-semibold tracking-[0.2em] text-primary uppercase text-center">
          Earn &rarr; Track &rarr; Analyze &rarr; Save &rarr; Grow
        </span>
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
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-textColor leading-tight tracking-tight font-playfair">
              Understand your money. <br />
              <span className="text-primary">Control your future.</span>
            </h1>
            <p className="text-muted-textColor text-lg max-w-xl">
              Your intelligent companion for tracking expenses, setting smart goals, and achieving financial freedom. Take the guesswork out of your finances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
              {user.isSignedIn ? (
                <button className="px-8 py-3.5 bg-primary hover:bg-primary/85 text-primary-textColor font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-primary/25">
                  Get Started
                </button>
              ) : (
                <Link href="/signup" className="px-8 py-3.5 bg-primary hover:bg-primary/85 text-primary-textColor font-semibold rounded-md transition-all duration-300 shadow-lg hover:shadow-primary/25">
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl m-2 text-center font-bold mb-6 mt-10 text-textColor">Our Testimonials</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 items-center justify-center mb-15 w-full gap-10">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              text={testimonial.text}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-15 w-full">
        <FAQs />
      </div>
    </>
  )
}