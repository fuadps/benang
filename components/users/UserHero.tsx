import useUsers from "@/hooks/useUsers";
import Image from "next/image";
import Avatar from "@/components/Avatar";

interface UserHeroProps {
    userId: string,
}

const UserHero: React.FC<UserHeroProps> = ({userId}) => {
    const {data: fetchedUser} = useUsers(userId)

    return (
        <div>
            <div className="bg-neutral-700 h-44 relative">
                { fetchedUser?.coverImage && (
                    <Image src={fetchedUser.coverImage} alt="image" style={{ objectFit: 'cover'}} />
                )}

                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>

        </div>
    )
}

export default UserHero