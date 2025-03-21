"use client";

import Image from "next/image";
import { useFetch } from "@/shared/hooks/useFetch";
import { Quote } from "@/shared/types/quote";
import { playfairDisPlay } from "@/shared/fonts/fonts";
import { Sparkle } from "lucide-react";
import QuoteContent from "./quote-content";
import QuoteReflection from "./quote-reflection";

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
        <div className="relative bg-[#F0F0F0]">
            <div className="absolute inset-0 z-0 flex justify-center items-center ">
                <Image
                    src="/assets/images/Layer_1.svg"
                    alt="Overlay image"
                    width={600}
                    height={200}
                    quality={100}
                    className="object-cover"
                />
                <div className="absolute inset-0 z-0 flex justify-center items-center ">
                </div>
            </div>

            <section className="relative md:py-20 py-20 z-10 flex flex-col items-center gap-6 mx-auto md:max-w-7xl">
                <div className="flex flex-col items-center gap-3">
                    <p className={`${playfairDisPlay.className} dark:text-black font-bold md:text-5xl text-4xl text-center tracking-wide`}>
                        Quote of the day
                    </p>
                    <div className="relative flex items-center justify-center w-full max-w-lg">
                        <div className="flex-grow border-t border-3 border-black"></div>
                        <span className="mx-4 text-5xl animate-pulse">
                            <Sparkle className="text-black" />
                        </span>
                        <div className="flex-grow border-t border-3 border-black"></div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="w-full relative">
                        <div className="relative w-full flex justify-center items-center">
                            <Image
                                src="/assets/images/qotd.png"
                                alt="Decorative image"
                                width={600}
                                height={300}
                                quality={100}
                                className="w-full"
                            />

                            <QuoteContent
                                quote={quote || {
                                    title: "Nếu hôm nay là một trang sách mới, bạn sẽ viết gì lên đó?",
                                    text: "Loading...",
                                    author: "",
                                }}
                            />

                        </div>
                    </div>
                    <QuoteReflection reflection={quote?.reflection || ""} />
                </div>

            </section>
        </div>
    );
};
export default QuoteOfTheDay;
