import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";
import useLoginModal from "@/hooks/useLoginModal";
import {useCallback, useMemo} from "react";
import {toast} from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
    const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser()
    const {mutate: mutateFetchedUser} = useUsers(userId)

    const loginModal = useLoginModal()

    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || []

        return list.includes(userId)
    }, [currentUser?.followingIds, userId])

    const toggleFollow = useCallback(async () => {
        if(!currentUser)
            return loginModal.onOpen()

        try {
            let request

            if(isFollowing)
                request = () => axios.delete('/api/follow', {data: {userId}})
            else
                request = () => axios.post('/api/follow', {userId})

            await request()

            await mutateCurrentUser()
            await mutateFetchedUser()

            toast.success('Success')

        } catch(error) {
            console.log(error)
            toast.error('Something went wrong!')
        }
    }, [currentUser, isFollowing, loginModal, mutateCurrentUser, mutateFetchedUser, userId])

    return {
        isFollowing,
        toggleFollow,
    }
}

export default useFollow