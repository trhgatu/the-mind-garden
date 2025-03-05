import { motion } from "framer-motion";
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
            className="relative flex-1 px-6"
        >
            <span className="absolute top-2 left-4 text-5xl text-gray-400 dark:text-gray-500 opacity-50">
                ❝
            </span>
            <p className={`text-lg font-medium ${lora.className} leading-relaxed italic text-center`}>
                {reflection}
            </p>

            <span className="absolute bottom-2 right-4 text-5xl text-gray-400 dark:text-gray-500 opacity-50">
                ❞
            </span>
        </motion.div>
    );
};

export default QuoteReflection;
