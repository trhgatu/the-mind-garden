import { Quote } from "@/shared/types/quote";
import { lora } from "@/shared/fonts/fonts";

interface QuoteContentProps {
    quote: Quote;
}

const QuoteContent = ({ quote }: QuoteContentProps) => {
    return (
        <section className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <blockquote className={`relative ${lora.className} text-lg transition-all duration-300`}>
                <figure className="relative w-48 md:w-[310px] max-w-2xl mx-auto text-center">
                    <svg className="hidden md:flex w-6 h-6 md:h-10 md:w-10 mx-auto mb-3 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                    </svg>

                    <span className="text-primary font-light italic text-base md:text-xl">“{quote?.text || "Loading..."}”</span>

                    {quote?.author && (
                        <figcaption className="mt-4 text-sm text-gray-600">
                            — <span className="font-medium">{quote.author} {quote.source && `, ${quote.source}`}</span>
                        </figcaption>
                    )}
                </figure>
            </blockquote>
        </section>
    );
};

export default QuoteContent;
