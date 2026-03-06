import Image from "next/image";
import { getProfile } from "../api/users/actions";
import { DetailsPage } from "../components/DetailPage";
import DetailRow from "../components/DetailListItem/DetailRow";
import Link from "../components/Link";
import { Reservation } from "@/types/Reservation";
import DetailListItem from "../components/DetailListItem";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Hotel } from "@/types/Hotel";
import HotelLisItem from "../components/HotelLisItem";

type RecentReservationProps = {
    reservation?: Reservation;
}

type MyHotelsProps = {
    hotels?: Hotel[] 
}

const RecentReservation = ({ reservation }: RecentReservationProps) => {
    if (!reservation) {
        return <div className="mt-10 w-full text-center">Não há reservas ainda</div>
    }
    return (
        <>
            <div className="my-10">
                <DetailListItem reservation={reservation}/>
            </div>
            <Link href="/reservas" className="justify-center text-blue-500">Ver todas as reservas</Link>
        </>
    )
}

const MyHotels = ({ hotels }: MyHotelsProps) => {
    if (!hotels) {
        return <div className="mt-10 w-full text-center">Não há hospedagens disponiveis</div>
    }
    return (
        <>
            <div className="my-10">
                {
                    hotels.reverse().slice(0, 2).map(hotel => {
                    return <HotelLisItem hotel={hotel} key={hotel.id}/>
                    })
                }
            </div>
            <Link href="/minhas-hospedagens" className="justify-center text-blue-500">Ver todas as minhas hospedagens </Link>
        </>
    )
}


const PerfilPage = async () => {
    const session = await getServerSession();

    if(!session?.user){
        redirect('/login')
    }

    const { user, hotels, reservations} = await getProfile();

    const asideContainer = user.role === 'USER' ?
    {
        title: 'Reserva mais recente',
        children: <RecentReservation reservation={reservations[reservations.length - 1]}/>
    } :
    {
        title: 'Minhas Hospedagens',
        children: <MyHotels hotels={hotels}/>
    } 

    return ( 
            <DetailsPage
                title="Meu Perfil"
                previusPage="/"
                asideContainer={asideContainer}
            >
                <div className="mt-4 flex flex-col justify-center items-center">
                    <Image
                        src={ user?.avatar ? `/uploads/avatars/${user.avatar}` : '/default-profile.jpg' }
                        alt={`Foto do perfil do ${ user?.name || 'usuário'}`}
                        width={300}
                        height={300}
                        className="rounded-full w-36 h-36 object-cover"
                    />
                </div>
                <div className="flex justify-center mt-5">
                    <span>
                        No DNC Hotel desde {new Date(user.createdAt).getFullYear()}
                    </span>
                </div>
                <hr className="my-10"/>
                <DetailRow
                    title="Nome"
                    description={user?.name}
                />
                <DetailRow
                    title="Email"
                    description={user?.email}
                />
                <div className="w-full mt-10">
                    <Link href="/perfil/editar" className="text-blue-500 justify-center">Editar perfil</Link>
                </div>
            </DetailsPage>
    )
}

export default PerfilPage;