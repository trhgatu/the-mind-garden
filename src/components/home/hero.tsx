import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-800 text-white">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="The Mind Garden"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>
      <div className="relative text-center p-5">
        <h1 className="text-4xl font-bold">The Mind Garden</h1>
        <p className="mt-3 text-lg">Nơi ươm mầm những suy nghĩ và câu chuyện</p>
      </div>
    </section>
  );
};

export default Hero;
