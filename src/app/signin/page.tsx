import { SignInButton } from "@clerk/nextjs"
export default function SignInPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl">Sign In Page</h1>
      <SignInButton>
        <button className="px-5 py-2 rounded-lg font-medium bg-linear-to-r from-cyan-400 to-blue-500 text-black hover:scale-105 transition-all duration-300 shadow-md hover:shadow-cyan-500/30 text-xl">
          Sign In
        </button>
      </SignInButton>
    </div>
  )
}