import { getReservationById } from "@/app/api/reservations/actions";
import Link from "@/app/components/Link";
import Image from "next/image";
import { DetailPageProps } from "@/types/DetailPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserDetails from "@/app/components/UserDetails";

const SolicitacaoReservaPage = async ({ params }: DetailPageProps) => {
    const session = await getServerSession();

    if (!session?.user){
        redirect('/login');
    }

    const { id } = await params;
    const reservation = await getReservationById(Number(id));
    const user = session?.user.role === "ADMIN" ? reservation.hotel.owner : session?.user;

    return(
        <div className="flex flex-col w-full max-w-lg my-24 px-8">
            <section className="w-full">
                <Link className="text-blue-500 " href="/reservas">Voltar</Link>
            </section>
            <section className="flex mt-2 flex-col">
                <article className="w-full">
                    <h1 className="font-bold text-4xl">Sua solicitação de reserva foi enviada com sucesso!</h1>
                    <UserDetails user={user} role={session.user.role} />
                    <hr className="mt-4"/>
                    <div className="mt-4 flex flex-col">
                        <h3 className="font-bold text-2xl">
                            Enviamos a solicitação de reserva para o anfitrião.
                        </h3>
                        <span className="mt-4">
                            Estamos aguardando a resposta do anfitrião, para sua reserva em {reservation?.hotel?.name || 'Hotel não especificado'}, em breve você receberá atualizações!
                        </span>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <h3 className="font-bold text-2xl">Endereço</h3>
                        <span className="mt-4">{reservation?.hotel?.address || 'Endereço não disponível'}</span>
                    </div>
                </article>

            </section>
        </div>
    )
}


export default SolicitacaoReservaPage;