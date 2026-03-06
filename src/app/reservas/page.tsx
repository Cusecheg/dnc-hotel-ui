import { getServerSession } from "next-auth";
import { getReservationsByUserId } from "../api/reservations/actions";
import { redirect } from "next/navigation";
import DetailListItem from "../components/DetailListItem";
import { Reservation } from "@/types/Reservation";
import Link from "../components/Link";
import { authOptions } from "../api/auth/[...nextauth]/route";


const ReservaPage = async () => {
    const session = await getServerSession(authOptions);

    if(!session?.user){
        redirect('/login');
    }

    const reservations = await getReservationsByUserId();

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
            <div className="py-20">
            <Link href="/perfil" className="my-4 text-blue-500">Voltar</Link>
            <h1 className="font-bold text-4xl">Minhas reservas</h1>
            <section className="flex flex-col my-4">
            { pending.length > 0 && (
                <div >
                    <h2 className="font-bold text-2xl my-4">Reservas Pendentes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pending.map((reservation: Reservation) => <DetailListItem key={reservation.id} reservation={reservation} />)}
                    </div>
                </div>
            )}
            { approved.length > 0 && (
                <div>
                    <h2 className="font-bold text-2xl my-4">Reservas Aprovadas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {approved.map((reservation: Reservation) => <DetailListItem key={reservation.id} reservation={reservation} />)}
                    </div>
                </div>
            )}
            { rejected.length > 0 && (
                <div>
                    <h2 className="font-bold text-2xl my-4">Reservas Rejeitadas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rejected.map((reservation: Reservation) => <DetailListItem key={reservation.id} reservation={reservation} />)}
                    </div>
                </div>
            )}
            </section>
            </div>
    )
}

export default ReservaPage;