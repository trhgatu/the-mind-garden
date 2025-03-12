import Image from "next/image";

const TornPaperDivider = () => {
    return (
        <div className="absolute -bottom-1 w-full overflow-hidden">
            <Image
                src="/assets/images/gray-divider.svg"
                alt="Divider"
                width={1800}
                height={100}
                className="w-full scale-100 sm:scale-100 md:scale-100"
                priority
            />
        </div>
    );
}

export default TornPaperDivider;