import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getReservationById } from "@/app/api/reservations/actions";
import DetailRow from "@/app/components/DetailListItem/DetailRow";
import { DetailsPage } from "@/app/components/DetailPage";
import UserDetails from "@/app/components/UserDetails";
import { getFormattedDate } from "@/helpers/format/data";
import { getFormattedStatus } from "@/helpers/format/dictionary/status";
import { getFormattedPrice } from "@/helpers/format/money";
import { DetailPageProps } from "@/types/DetailPage";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";





const DetalhesReservaPage = async ({ params }: DetailPageProps) => {

    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect('/login');
    }

    const { id } = await params;

    const reservation = await getReservationById(Number(id));
    const user = session?.user.role === "ADMIN" ? reservation.user : reservation.hotel.owner 
    const previusPageForRole = session?.user.role === "ADMIN" ? `/minhas-hospedagens/${reservation.hotel.id}/reservas` : '/reservas';

    return(
        <DetailsPage
        title={`Sua reserva no ${reservation.hotel?.name}`}
        image={{
            src: reservation.hotel.image,
            alt: `Foto do hotel ${reservation.hotel?.name}`
        }}
        previusPage={previusPageForRole}
        asideContainer={{
            title: 'Informações da estadia',
            children: <>
            <DetailRow title="Status" description={getFormattedStatus(reservation.status)} className="mt-1"/>
            <DetailRow title="Código da reserva" description={reservation.id} className="mt-1"/>
            <DetailRow title="Valor Total" description={getFormattedPrice(reservation.total)} className="mt-1"/>
            <DetailRow title="Data de início" description={getFormattedDate(reservation.checkIn)} className="mt-1"/>
            <DetailRow title="Data de término" description={getFormattedDate(reservation.checkOut)} className="mt-1"/>
            <hr className="mt-5"/>
            <Link href={previusPageForRole} className="block w-full text-center text-blue-500 hover:underline mt-5">
            {session?.user.role === "ADMIN" ? "Voltar ás minhas hospedagens" : "Voltar às reservas"}
            </Link>
            </>
        }}
        >
            <UserDetails user={user} role={session.user.role}/>
            <hr className="my-10" />
                    <div className="mt-4 flex flex-col">
            <h3 className="font-bold text-2xl">Endereço</h3>
            <span className="mt-4">{reservation.hotel.address}</span>
            </div>
            <div className="mt-4 flex flex-col">
                <h3 className="font-bold text-2xl">Sobre este espaço</h3>
                <span className="mt-4">{reservation.hotel.description}</span>
            </div>
        </DetailsPage>
    )
}

export default DetalhesReservaPage;