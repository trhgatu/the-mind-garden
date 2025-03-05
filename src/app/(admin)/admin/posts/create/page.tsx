import { CreatePostPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tạo bài viết mới",
};

function CreatePostPageRoute() {
  return <CreatePostPage />;
}

export default CreatePostPageRoute;