import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQs() {
    return (
        <>
            <Accordion
                type="single"
                collapsible
                defaultValue="shipping"
                className="w-11/12 rounded-md text-card-textColor mb-15 mt-15 flex flex-col border bg-card p-5 justify-center"
            >
                <h1 className="flex flex-col justify-center items-center text-2xl">Frequently Asked Questions</h1>
                <AccordionItem value="shipping">
                    <AccordionTrigger className="hover:text-secondary transition text-center"><span className="flex-1 text-center">What is this platform?</span></AccordionTrigger>
                    <AccordionContent>
                        <div className="text-center">
                            Finsight AI is an AI-powered financial management platform that helps users track expenses, analyze spending patterns, and make smarter financial decisions.
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                    <AccordionTrigger className="hover:text-secondary transition text-center"><span className="flex-1 text-center">Who can use it?</span></AccordionTrigger>
                    <AccordionContent>
                        <div className="text-center">
                            Anyone who wants to manage their finances better — especially students, young professionals, and beginners in personal finance.
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="free">
                    <AccordionTrigger className="hover:text-secondary transition text-center"><span className="flex-1 text-center">Is it free to use?</span></AccordionTrigger>
                    <AccordionContent>
                        <div className="text-center">
                            Yes, it is free to use for users.
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="support">
                    <AccordionTrigger className="hover:text-secondary transition text-center"><span className="flex-1 text-center">Can I set financial goals?</span></AccordionTrigger>
                    <AccordionContent>
                        <div className="text-center">
                            Yes, users can set goals like saving targets, and the platform tracks progress with actionable insights.
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}