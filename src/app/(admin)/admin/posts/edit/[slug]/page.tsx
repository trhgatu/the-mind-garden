import { EditPostPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Chỉnh sửa bài viết",
};

function EditPostPageRoute() {
  return <EditPostPage />;
}

export default EditPostPageRoute;