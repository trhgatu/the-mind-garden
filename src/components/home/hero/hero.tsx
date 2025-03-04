"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { quintessential } from "@/shared/fonts/fonts";
import { lora } from "@/shared/fonts/fonts";
import "./hero.scss";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="hero rounded-md">
        <div className="flex flex-col gap-6 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <DotLottieReact
              src="https://lottie.host/8daeb668-7431-49ae-98a8-eb775e2dfc52/6prmrBwtfu.lottie"
              className="w-80 sm:w-96"
              loop
              autoplay
            />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative text-center"
          >
            <h1
              className={`hero-title text-4xl sm:text-5xl font-bold ${quintessential.className} `}
            >
              The Mind Garden.
            </h1>
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
