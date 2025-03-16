'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetch } from "@/shared/hooks";
import { Post } from "@/shared/types";
import { lora } from "@/shared/fonts/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LetterFromReadersProps {
  limit?: number;
}

export function LettersFromReaders({ limit = 3 }: LetterFromReadersProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading } = useFetch<{ data: Post[] }>({
    entity: "posts",
    path: `?type=letter&limit=${limit}`,
    options: {
      queryKey: ["posts"],
    },
  });

  const letters: Post[] = data?.data ?? [];

  const nextLetter = () => {
    if (letters.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % letters.length);
    }
  };

  const prevLetter = () => {
    if (letters.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + letters.length) % letters.length);
    }
  };

  useEffect(() => {
    // Auto rotate letters every 8 seconds
    const interval = setInterval(() => {
      nextLetter();
    }, 8000);

    return () => clearInterval(interval);
  }, [letters.length]);

  return (
    <div className="relative">
      {/* Envelope background */}
      <div
        className="relative overflow-hidden rounded-lg border-2 border-amber-200 shadow-lg bg-amber-50"
        style={{
          backgroundImage: "url('/assets/images/envelope_texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "420px"
        }}
      >
        {/* Envelope fold effect */}
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
          pointerEvents: "none"
        }}></div>

        {/* Wax seal or stamp */}
        <div className="absolute -top-4 right-6 w-16 h-16 rounded-full bg-red-700/90 transform rotate-12 flex items-center justify-center shadow-md">
          <span className={`${lora.className} text-xs text-white font-semibold`}>THƯ</span>
        </div>

        {/* Content */}
        <div className="p-6 pt-10">
          <h3 className={`${lora.className} text-xl font-bold text-amber-900 mb-6 text-center`}>
            Lá thư từ độc giả
          </h3>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-20 w-full bg-gray-300 rounded"></div>
              </div>
            </div>
          ) : letters.length > 0 ? (
            <div className="relative h-64 transition-all duration-500">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(139,106,74,0.1) 24px, rgba(139,106,74,0.1) 25px)',
                backgroundPosition: '0 1.3rem',
                pointerEvents: 'none'
              }}></div>

              {letters.map((letter, index) => (
                <div
                  key={letter._id}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <Link href={`/post/${letter.slug}`} className="block">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-200 shadow-md mb-2">
                        <Image
                          src={"https://dummyimage.com/100x100/d9d9d9/fff&text=Ảnh"}
                          alt={"Độc giả"}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <p className={`${lora.className} text-amber-800 font-medium text-sm`}>
                        {"Độc giả ẩn danh"}
                      </p>
                      <p className="text-amber-700/70 text-xs italic">
                        {new Date(letter.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>

                    <p className="text-amber-900 text-sm line-clamp-5 italic text-center px-4">
                      {letter.content}
                    </p>
                  </Link>
                </div>
              ))}

              {/* Navigation buttons */}
              {letters.length > 1 && (
                <>
                  <button
                    onClick={prevLetter}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-100/70 hover:bg-amber-200/70 rounded-r-full p-1 transition-colors"
                    aria-label="Previous letter"
                  >
                    <ChevronLeft size={18} className="text-amber-800" />
                  </button>
                  <button
                    onClick={nextLetter}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-100/70 hover:bg-amber-200/70 rounded-l-full p-1 transition-colors"
                    aria-label="Next letter"
                  >
                    <ChevronRight size={18} className="text-amber-800" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center">
              <div
                className="w-16 h-16 mb-4"
                style={{
                  backgroundImage: "url('/assets/images/quill_pen.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              ></div>
              <p className={`${lora.className} text-amber-800 text-center italic`}>
                Chưa có lá thư nào từ độc giả.
              </p>
              <p className="text-amber-700 text-sm text-center mt-2">
                Hãy là người đầu tiên gửi lá thư của bạn!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}