import { TagsPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bài viết",
  };

function TagsPageRoute() {
    return <TagsPage />;
}

export default TagsPageRoute;