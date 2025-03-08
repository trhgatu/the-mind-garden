import { motion } from "framer-motion";
import Image from "next/image";
import { lora } from "@/shared/fonts/fonts";

interface QuoteReflectionProps {
    reflection: string;
}

const QuoteReflection = ({ reflection }: QuoteReflectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="relative w-full">
                <div className="relative md:w-[500px]">
                    <Image
                        src="https://optim.tildacdn.pub/tild3463-6165-4834-b661-346363303337/-/resize/664x/-/format/webp/image-from-rawpixel-.png"
                        alt="Decorative image"
                        objectFit="cover"
                        quality={100}
                        width={600}
                        height={300}
                        sizes="100vw"
                        style={{
                          objectFit: 'cover',
                        }}
                        className="relative"
                    />
                </div>
                <div className="absolute md:w-[350px] w-[280px] top-1/3 left-1/6">
                    <p
                        className={`md:text-xl font-medium ${lora.className} tracking-wide text-primary leading-relaxed`}
                    >
                        {reflection}
                    </p>
                </div>
            </div>

            {/* Text content */}

        </motion.div>
    );
};

export default QuoteReflection;
