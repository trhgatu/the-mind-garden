import Image from "next/image";
import { lora } from "@/shared/fonts/fonts";

interface QuoteReflectionProps {
    reflection: string;
}

const QuoteReflection = ({ reflection }: QuoteReflectionProps) => {
    return (
        <div className="relative w-full flex justify-center items-center">
            <div className="relative md:w-[500px]">
                <Image
                    src="/assets/images/reflection.png"
                    alt="Decorative image"
                    width={600}
                    height={300}
                    quality={100}
                    className="w-full h-auto object-cover"
                />
                <div className="absolute z-10 -top-14 -left-12">
                    <Image
                        src="/assets/images/flower.png"
                        alt="Overlay image"
                        width={200}
                        height={200}
                        quality={100}
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <p
                        className={`md:text-xl text-base w-[250px] md:w-[350px] font-medium ${lora.className} tracking-wide text-primary leading-relaxed text-center`}
                    >
                        {reflection}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuoteReflection;
