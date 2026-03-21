import Background from "../../public/homepage-img.png"
import Image from "next/image"
export default function HomePage() {
  return (
    <div className="flex flex-row items-center gap-20">
      <Image src={Background} alt="Homepage Background" className="w-150"/>
      <div>
        <h1 className="text-3xl text-white text-bold">Understand your money. Control your future.</h1>
      </div>
    </div>
  )
} 