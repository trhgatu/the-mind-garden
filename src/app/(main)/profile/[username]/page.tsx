import { ProfilePage } from ".";

export default async function ProfilePageRoute({ params }: { params: Promise<{ username: string }> }) {
    const resolvedParams = await params;

    return <ProfilePage params={resolvedParams} />;
}
