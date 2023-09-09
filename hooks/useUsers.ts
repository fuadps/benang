import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUsers = (userId?: string) => {
    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : '/api/users', fetcher)

    return {
        data,
        error,
        isLoading,
        mutate,
    }
}

export default useUsers