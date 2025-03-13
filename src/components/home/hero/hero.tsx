"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { quintessential } from "@/shared/fonts/fonts";
import { lora } from "@/shared/fonts/fonts";
import { Sparkle } from "lucide-react";
import "./hero.scss";
import { motion } from "framer-motion";
import { TornPaperDivider } from "@/components/home";

const Hero = () => {
  return (
    <section
      className="hidden relative md:flex h-screen items-center justify-center
             bg-no-repeat bg-center
             bg-cover
             bg-[url('/assets/images/hero-background.svg')]"
    >
      <div className="rounded-md">
        <div className="flex flex-col gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <DotLottieReact
              src="https://lottie.host/223bf2e2-0b64-4028-b95a-a8f46e27519b/ossLMhMQsm.lottie"
              className="lottie-animation w-[250px] sm:w-[350px] md:w-[400px]"
              loop
              autoplay
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative text-center"
          >
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl font-bold ${quintessential.className}`}
            >
              The Mind Garden.
            </h1>
            <div className="relative flex items-center my-8">
              <div className="flex-grow border-t border-2 border-accent-foreground"></div>
              <span className="mx-4 text-3xl sm:text-5xl animate-pulse">
                <Sparkle />
              </span>
              <div className="flex-grow border-t border-2 border-accent-foreground"></div>
            </div>

            <p className={`mt-4 text-base sm:text-lg md:text-xl ${lora.className}`}>
              Mỗi câu chữ là một hạt giống của tâm hồn.
            </p>
          </motion.div>
        </div>
      </div>
      <TornPaperDivider />
    </section>
  );
};

export default Hero;
