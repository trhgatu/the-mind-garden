import { Quote } from "@/shared/types/quote";
import { motion } from "framer-motion";
import { lora } from "@/shared/fonts/fonts";

interface QuoteContentProps {
    quote: Quote;
}

const QuoteContent = ({ quote }: QuoteContentProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="px-6"
        >
            <section className="max-w-2xl mx-auto text-center">
                <blockquote className={`relative ${lora.className} text-lg p-4 border-r-4 border-primary rounded-md transition-all duration-300`}>
                    <figure className="relative max-w-2xl mx-auto text-center p-6">
                        <svg className="w-12 h-12 mx-auto mb-4 text-primary opacity-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>

                        “{quote?.text || "Loading..."}”

                        {quote?.author && (
                            <figcaption className="mt-4 text-sm">
                                — <span className="font-medium">{quote.author} {quote.source && `, ${quote.source}`}</span>
                            </figcaption>
                        )}
                    </figure>
                </blockquote>
            </section>
        </motion.div>
    );
};

export default QuoteContent;
