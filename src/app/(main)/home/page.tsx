import { HomePage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Home",
  };

function HomePageRoute() {
    return <HomePage />;
}

export default HomePageRoute;