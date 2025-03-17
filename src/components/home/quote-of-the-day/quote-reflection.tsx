import { lora } from "@/shared/fonts/fonts";

interface QuoteReflectionProps {
    reflection: string;
}

const QuoteReflection = ({ reflection }: QuoteReflectionProps) => {
    return (
        <div className="relative w-full flex justify-center items-center">
            <div className="flex items-center justify-center p-6">
                <p className={`md:text-xl italic ${lora.className} tracking-wide text-primary leading-relaxed text-center`}>
                    {reflection}
                </p>
            </div>
        </div>
    );
};

export default QuoteReflection;
