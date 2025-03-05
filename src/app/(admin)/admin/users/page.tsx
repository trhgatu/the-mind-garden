import { UsersPage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Bài viết",
  };

function UsersPageRoute() {
    return <UsersPage />;
}

export default UsersPageRoute;