import { CategoriesPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bài viết",
  };

function CategoriesPagePageRoute() {
    return <CategoriesPage />;
}

export default CategoriesPagePageRoute;