import { PostsPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bài viết",
  };

function PostsPageRoute() {
    return <PostsPage />;
}

export default PostsPageRoute;