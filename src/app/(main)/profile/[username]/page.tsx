import { ProfilePage } from '.';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Dòng thời gian",
  };

function ProfilePageRoute() {
    return <ProfilePage />;
}

export default ProfilePageRoute;