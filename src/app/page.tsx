import Background from "../../public/homepage-img.png"
import Image from "next/image"
import Footer from "@/components/ui/footer"
import FAQs from "@/components/Accordion"
import { CardVariant } from "@/components/Card"
export default function HomePage() {
  return (
    <>
    <div className="flex flex-row items-center gap-20">
      <Image src={Background} alt="Homepage Background" className="w-150"/>
      <div>
        <h1 className="text-3xl text-white font-bold font-playfair">Understand your money. Control your future.</h1>
      </div>
    </div>
    <CardVariant />
    <FAQs />
    <Footer />
    </>
  )
} 