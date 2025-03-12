import React from "react";
import { PostsWithCategories } from "@/components/home/posts-with-category/posts-with-category";
/* import FeaturedPosts from "@/components/home/featured-posts/featured-posts"; */

const PostsWithCategoriesAndFeatured: React.FC = () => {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="md:col-span-2">
        <PostsWithCategories />
      </div>

      <div className="md:col-span-1">
        {/* <FeaturedPosts /> */}
      </div>
    </div>
  );
};

export default PostsWithCategoriesAndFeatured;