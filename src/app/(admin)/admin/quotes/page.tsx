import { QuotesPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bài viết",
  };

function QuotesPageRoute() {
    return <QuotesPage />;
}

export default QuotesPageRoute;