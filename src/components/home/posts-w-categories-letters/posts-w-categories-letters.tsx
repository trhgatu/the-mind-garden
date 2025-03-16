import React from "react";
import { PostsWithCategories } from "@/components/home/posts-with-category/posts-with-category";
import { LettersFromReaders } from "@/components/home/letter-from-readers/letter-from-readers";

const PostsWithCategoriesAndLetters: React.FC = () => {
  return (
    <div
      className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8"
    >
      {/* Decorative elements */}
      <div className="absolute top-2 left-6 w-16 h-6"
        style={{
          backgroundImage: "url('/assets/images/tape_texture.png')",
          backgroundSize: "cover",
          opacity: 0.7,
          transform: "rotate(-5deg)"
        }}
      ></div>

      <div className="absolute top-2 right-6 w-16 h-6"
        style={{
          backgroundImage: "url('/assets/images/tape_texture.png')",
          backgroundSize: "cover",
          opacity: 0.7,
          transform: "rotate(5deg)"
        }}
      ></div>

      <div className="md:col-span-2 pt-6">
        <PostsWithCategories />
      </div>

      <div className="md:col-span-1 pt-6">
        <LettersFromReaders />
      </div>
    </div>
  );
};

export default PostsWithCategoriesAndLetters;