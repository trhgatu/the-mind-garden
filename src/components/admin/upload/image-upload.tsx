import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ImageUploadProps {
    selectedFile: File | null;
    setSelectedFile: (file: File | null) => void;
    existingImage?: string;
}

export default function ImageUpload({ selectedFile, setSelectedFile, existingImage }: ImageUploadProps) {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
    };

    return (
        <div>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {(selectedFile || existingImage) && (
                <div className="mt-2">
                    <Image
                        src={selectedFile ? URL.createObjectURL(selectedFile) : existingImage!}
                        alt="Preview"
                        width={600}
                        height={300}
                        className="w-40 h-40 object-cover rounded-md"
                    />
                </div>
            )}
        </div>
    );
}
