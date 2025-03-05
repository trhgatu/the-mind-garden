"use client"

import { useFetch } from "@/shared/hooks/useFetch";
import { Quote } from "@/shared/types/quote";
import { playfairDisPlay } from "@/shared/fonts/fonts";
import { motion } from "framer-motion";
import QuoteContent from './quote-content';
import QuoteReflection from './quote-reflection';

const QuoteOfTheDay = () => {
    const { data } = useFetch<{ data: Quote }>({
        url: "/quotes/get-qotd"
    });

    const quote = data?.data;

    return (
        <section className="flex flex-col items-center justify-center md:gap-20 gap-10 mx-auto md:max-w-7xl">
            <div className="flex flex-col items-center md:mt-20 mt-10 gap-6">
                <div className="relative w-2/3 max-w-lg">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-accent-foreground opacity-50"></div>
                    </div>
                </div>

                <p className={`${playfairDisPlay.className} font-bold md:text-4xl text-xl text-center text-primary tracking-wide`}>
                    {quote?.title}
                </p>

                <div className="relative w-2/3 max-w-lg">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-accent-foreground opacity-50"></div>
                    </div>
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-center gap-8"
            >
                <QuoteContent
                    quote={quote || {
                        title: "Nếu hôm nay là một trang sách mới, bạn sẽ viết gì lên đó?",
                        text: "Loading...",
                        author: ""
                    }} />
                <QuoteReflection reflection={quote?.reflection || ""} />
            </motion.div>
        </section>
    );
};

export default QuoteOfTheDay;
