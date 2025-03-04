"use client"

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { quintessential } from "@/shared/fonts/fonts";
import { lora } from '@/shared/fonts/fonts';

const Hero = () => {
  return (
    <section className="relative w-full h-[400px]">
      <div className='flex justify-center'>
        <DotLottieReact
          src="https://lottie.host/8daeb668-7431-49ae-98a8-eb775e2dfc52/6prmrBwtfu.lottie"
          className='w-96'
          loop
          autoplay
        />
      </div>
      <div className="relative text-center p-5">
        <h1 className={`text-5xl font-bold ${quintessential.className}`}>
          The Mind Garden.
        </h1>
        <p className={`mt-3 text-lg ${lora.className}`}>Mỗi câu chữ là một hạt giống của tâm hồn.</p>
      </div>
    </section>
  );
};

export default Hero;
