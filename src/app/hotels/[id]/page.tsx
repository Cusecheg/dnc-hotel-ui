
import { getHotelDetail } from "@/app/api/hotels/actions";
import { DetailsPage } from "@/app/components/DetailPage";
import { getFormattedPrice } from "@/helpers/format/money";
import Image from "next/image";
import HotelBookingForm from "../HotelBookingForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DetailPageProps } from "@/types/DetailPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserDetails from "@/app/components/UserDetails";
import { SessionProvider } from "next-auth/react";


async function HotelDetails({ params }: DetailPageProps ) {


    const session = await getServerSession(authOptions);

    if (!session?.user){
        redirect('/login');
    }

    const { id } = await params;

    const hotel = await getHotelDetail(Number(id));
    return (
        <>

        <DetailsPage 
        image={{ 
            src: hotel.image, alt: `Imagem de ${hotel.name}` 
            }} 
        title={hotel.name}
        asideContainer={{
            title: <>{getFormattedPrice(hotel.price)}&nbsp;noite </>,
            children: session.user?.role === "USER" ? <HotelBookingForm hotel={hotel} /> : null

        }}
        >   
        <UserDetails user={hotel?.owner} role={session.user.role} />
        <hr className="mt-4"/>
        <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">Endereço</h3>
            <span className="mt-4">{hotel.address}</span>
        </div>
        <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">Sobre este espaço</h3>
            <span className="mt-4">{hotel.description}</span>
        </div>

        </DetailsPage>
        </>
    )
}

export default HotelDetails;