import Image from "next/image";

const TornPaperDivider = () => {
    return (
        <div className="absolute bottom-0 w-full overflow-hidden">
            <Image
                src="/assets/images/gray-divider.svg"
                alt="Divider"
                width={1800}
                height={100}
                className="w-full scale-100"
            />
        </div>
    );
}
export default TornPaperDivider