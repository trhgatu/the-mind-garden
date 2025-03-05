"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { quintessential } from "@/shared/fonts/fonts";
import { lora } from "@/shared/fonts/fonts";
import { Sparkle } from "lucide-react";
import "./hero.scss";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="flex h-screen hero  items-center justify-center">
      <div className="rounded-md">
        <div className="flex flex-col gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <DotLottieReact
              src="https://lottie.host/8daeb668-7431-49ae-98a8-eb775e2dfc52/6prmrBwtfu.lottie"
              className="w-[350px] md:w-[400px]"
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
              className={`md:text-7xl text-5xl font-bold ${quintessential.className} `}
            >
              The Mind Garden.
            </h1>
            <div className="relative flex items-center my-8">
              <div className="flex-grow border-t border-2 border-accent-foreground"></div>
              <span className="mx-4 text-5xl animate-pulse">
                <Sparkle />
              </span>
              <div className="flex-grow border-t border-2 border-accent-foreground"></div>
            </div>

            <p className={`mt-4 text-lg sm:text-xl ${lora.className}`}>
              Mỗi câu chữ là một hạt giống của tâm hồn.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
