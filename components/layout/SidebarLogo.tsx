import {useRouter} from "next/router";
import {BsTwitter} from "react-icons/bs";
import {BiSolidLemon} from "react-icons/bi";

const SidebarLogo = () => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push('/')}
            className="rounded-full h-14 w-14 p-4 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
        >
            <BiSolidLemon size="24" color="orange"/>
        </div>
    )
}

export default SidebarLogo