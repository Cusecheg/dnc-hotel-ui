"use client"
import Image from "next/image"
import { InputHTMLAttributes, useState } from "react"

type ImageFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
    name?: string;
    avatar?: boolean
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 5MB

const ImageField = ({
    label,
    id,
    name,
    defaultValue,
    avatar = false,
}: ImageFieldProps) => {

    const pathImage = avatar ? `/uploads/avatars/${defaultValue}` : `/uploads-hotels/${defaultValue}`

    const [image, setImage] = useState<string | null | ArrayBuffer>(defaultValue ? pathImage : null);
    const [exceededImageSize, setExceededImageSize] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();

        setExceededImageSize((file?.size as number) > MAX_IMAGE_SIZE);

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file){
            reader.readAsDataURL(file)
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Image
            src={image ? image as string : '/default-profile.jpg'}
            width={100}
            height={100}
            alt='Profile picture'
            className="rounded-full relative object-cover w-24 h-24"
            />
            <label htmlFor={id} className="py-4 px-6 w-full border-none rounded-lg font-bold text-center cursor-pointer">
                {label}
            </label>
            {exceededImageSize && (
                <p className="text-red-500 text-sm mt-2">Image size exceeds the maximum limit of 2MB.</p>
            )}
            <input type="file" id={id} name={name} className="hidden" onChange={handleInputChange} />

        </div>
    )
}


export default ImageField;