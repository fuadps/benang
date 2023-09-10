import {useRouter} from "next/router";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import {useCallback, useMemo} from "react";
import {formatDistanceToNowStrict} from "date-fns";
import Avatar from "@/components/Avatar";
import {AiOutlineHeart, AiFillHeart, AiOutlineMessage} from "react-icons/ai";
import useLike from "@/hooks/useLike";
import postId from "@/pages/posts/[postId]";

interface CommentItemProps {
    data: Record<string, any>
}

const CommentItem: React.FC<CommentItemProps> =  ({data}) => {
    const router = useRouter()

    const goToUser = useCallback(async (event: any) => {
        event.stopPropagation()

        await router.push(`users/${data.user.id}`)
    }, [data.user.id, router])

    const createdAt = useMemo(() => {
        if(!data?.createdAt)
            return null

        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data?.createdAt])

    return (
        <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline ">{ data.user.name }</p>
                        <span onClick={goToUser} className="text-neutral-500 cursor-pointer hover:underline hidden md:block">@{data.user.username}</span>

                        <span className="text-neutral-500 text-sm">{ createdAt }</span>
                    </div>
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem