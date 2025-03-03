import { PostPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bài viết",
  };

function PostPageRoute() {
    return <PostPage />;
}

export default PostPageRoute;