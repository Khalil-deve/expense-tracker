import { useRef, useState } from "react"
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

export default function ProfilePhotoSelect({ Image, setImage }) {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
                setImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl(null);
        setImage(null);
        inputRef.current.value = null;
    };

    const onChoosefile = () => {
        inputRef.current.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden" />

            {
                !Image ? (
                    <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                        <LuUser className="text-4xl text-primary" />
                        <button type="button"
                            className="w-8 h-8 flex justify-center items-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 shadow-md hover:shadow-lg transition"
                            onClick={onChoosefile}>
                            <LuUpload />
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                        <img src={previewUrl || URL.createObjectURL(Image)} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                        <button type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
                            <LuTrash />
                        </button>
                    </div>
                )
            }
        </div>
    )
}