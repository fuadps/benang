import useCurrentUser from "@/hooks/useCurrentUser";
import useUsers from "@/hooks/useUsers";
import useEditModal from "@/hooks/useEditModal";
import {useCallback, useEffect, useState} from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import ImageUpload from "@/components/ImageUpload";

const EditModal = () => {
    const {data: currentUser} = useCurrentUser()
    const {mutate: mutateFetchedUser} = useUsers(currentUser?.id)
    const editModal = useEditModal()

    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setBio(currentUser?.bio)
        setUsername(currentUser?.username)
    }, [currentUser])

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async() => {
        try {
            setIsLoading(true)

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage,
            })

            await mutateFetchedUser()

            toast.success('Profile updated')

            editModal.onClose()
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }, [bio, coverImage, mutateFetchedUser, name, profileImage, username])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Upload Profile Image"
            />

            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Upload Cover Image"
            />

            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />

            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />

            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            actionLabel="Save"
            body={bodyContent}
        />
    )
}

export default EditModal