import { DashBoardPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dashboard",
  };

function DashBoardPageRoute() {
    return <DashBoardPage />;
}

export default DashBoardPageRoute;