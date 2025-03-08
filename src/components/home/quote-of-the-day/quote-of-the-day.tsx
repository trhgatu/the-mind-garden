"use client"

import { useFetch } from "@/shared/hooks/useFetch";
import { Quote } from "@/shared/types/quote";
import { playfairDisPlay } from "@/shared/fonts/fonts";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import QuoteContent from './quote-content';
import QuoteReflection from './quote-reflection';

const QuoteOfTheDay = () => {
    const { data } = useFetch<{ data: Quote }>({
        entity: "quotes",
        path: "get-qotd",
        options: {
            queryKey: ["quotes", "get-qotd"],
        },
    });
    const quote = data?.data;

    return (
        <div className="relative">
            <section className="flex flex-col items-center justify-center md:gap-20 gap-10 mx-auto md:max-w-7xl">
                <div className="flex flex-col items-center md:mt-20 mt-10 gap-6">
                    <p className={`${playfairDisPlay.className} font-bold md:text-6xl text-3xl text-center text-primary tracking-wide`}>
                        Quote of the day
                    </p>
                    <div className="relative flex items-center justify-center w-full max-w-lg">
                        <div className="w-full border-t-2 border-accent-foreground opacity-50"></div>
                        <Sparkle className="absolute bg-background text-accent-foreground p-1 rounded-full w-8 h-8" />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-center gap-8"
                >
                    <QuoteReflection reflection={quote?.reflection || ""} />
                    <QuoteContent
                        quote={quote || {
                            title: "Nếu hôm nay là một trang sách mới, bạn sẽ viết gì lên đó?",
                            text: "Loading...",
                            author: ""
                        }} />

                </motion.div>
            </section>
        </div>
    );
};

export default QuoteOfTheDay;
