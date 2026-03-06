import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Reservation } from "@/types/Reservation";
import { DetailPageProps } from "@/types/DetailPage";
import { getHotelById } from "@/app/api/hotels/actions";
import { getReservationsByHotel, getReservationsByUserId } from "@/app/api/reservations/actions";
import ReservationOwnerListItem from "@/app/components/DetailListItem/Owner";
import Link from "@/app/components/Link";
import Image from "next/image";


const ReservaPage = async ({ params} : DetailPageProps) => {
    const session = await getServerSession();

    if(!session?.user){
        redirect('/login');
    }

    const { id } =  await params;
    const hotel = await getHotelById(Number(id))
    const reservations = await getReservationsByHotel(Number(id));

    const { pending, approved, rejected }  = reservations.reduce((acc: any, reservation: Reservation) => {
        if (reservation.status === 'PENDING') {
            acc.pending.push(reservation);
        } if (reservation.status === 'APPROVED') {
            acc.approved.push(reservation);
        } else if (reservation.status === 'REJECTED') {
            acc.rejected.push(reservation);
        }        return acc;
    }, { pending: [] as Reservation[],
        approved: [] as Reservation[],
        rejected: [] as Reservation[]
     }
    );
    
    return(
        <div className="p-20 w-full">
        <div className="flex justify-between w-full">
            <Link href="/minhas-hospedagens" className="my-4 text-blue-500">Voltar</Link>
            <Link href={`/minhas-hospedagens/${id}/editar`} className="my-4 text-blue-500">Editar hospedagem</Link>
        </div>
        <div className=" flex justify-center items-center relative w-full h-64 md:h-96">
            <Image
                src={hotel.image ? `/uploads-hotels/${hotel.image}` : '/no-hotel.jpg'}
                alt={`Foto do hotel ${hotel.name}`}
                fill
                className="absolute w-full rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                <h1 className="text-white font-bold text-4xl md:text-5xl">
                    {hotel.name}
                </h1>
            </div>
        </div>
        <span className="flex text-2xl font-bold mt-12">Solicitações de reservas</span>
        <section>
        { pending.length > 0 && (
            <div >
                <h2 className="font-bold text-2xl my-4">Reservas Pendentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pending.map((reservation: Reservation) => <ReservationOwnerListItem key={reservation.id} reservation={reservation} />)}
                </div>
            </div>
        )}
        { approved.length > 0 && (
            <div>
                <h2 className="font-bold text-2xl my-4">Reservas Aprovadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {approved.map((reservation: Reservation) => <ReservationOwnerListItem key={reservation.id} reservation={reservation} />)}
                </div>
            </div>
        )}
        { rejected.length > 0 && (
            <div>
                <h2 className="font-bold text-2xl my-4">Reservas Rejeitadas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rejected.map((reservation: Reservation) => <ReservationOwnerListItem key={reservation.id} reservation={reservation} />)}
                </div>
            </div>
        )}
        </section>
        </div>
    )
}

export default ReservaPage;