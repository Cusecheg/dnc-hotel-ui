import Image from "next/image";
import Link from "../Link"


type ImageProps = {
    src: string | null;
    alt: string | null;
}

type AsideContainerProps = {
    title: string | React.ReactNode;
    children: React.ReactNode;
}

type DetailsPageProps = {
    previusPage?: string;
    additionalLink?: string;
    additionalLinkText?: string;
    children?: React.ReactNode;
    image?: ImageProps;
    title: string;
    asideContainer?: AsideContainerProps;
}

export const DetailsPage = ({ previusPage = "/", children, image, title, asideContainer, additionalLink, additionalLinkText }: DetailsPageProps) => {
    return (
        <div className="flex flex-col w-full px-10 py-20 sm:px-20 md:px-32 lg:px-56 xl:px-72">
            <section  className=" flex justify-between not-[]:w-full">
                <Link href={previusPage} className="text-blue-500">Voltar</Link>
                {additionalLink && additionalLinkText && (
                    <Link href={additionalLink} className="text-blue-500">{additionalLinkText}</Link>
                )}
            </section>
                {image && (

                    <section className="relative w-full h-80 mt-2">
                        <Image
                            src={(image?.src ? `/uploads-hotels/${image.src}` : '/no-hotel.jpg')}
                            alt={image.alt || 'Imagem detalhada'}
                            fill
                            className="object-cover rounded-3xl"
                        />
                    </section>
                )}
                <section className="flex flex-col mt-2 sm:flex-row">
                    <article className="w-full">
                        <h1 className="font-bold text-4xl">{title}</h1>
                        {children}
                    </article>
                    <article className="w-full h-auto shadow-lg rounded-xl ml-0 p-8 flex flex-col justify-start self-start sm:ml-10 ">
                        <span className="flex text-2xl font-bold">
                            {asideContainer?.title}
                        </span>
                        <div>
                            {asideContainer?.children}
                        </div>

                    </article>
                </section>
        </div>
    )
}

