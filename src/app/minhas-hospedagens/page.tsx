import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Hotel } from "@/types/Hotel";
import { getHotelsByOwner } from "../api/hotels/actions";
import HotelLisItem from "../components/HotelLisItem";
import Link from "../components/Link";





export default async function MinhasHospedagensPage() {
  const session = await getServerSession();

  if(!session?.user) redirect('/login');

  const hotels = await getHotelsByOwner();

  
  
  return (
    <div className="py-20">
        <section className="flex justify-between w-full my-4">
            <Link href="/perfil" className="text-blue-500">Voltar</Link>
            <Link href="/minhas-hospedagens/cadastrar" className="text-blue-500">Nova hospedagem</Link>
        </section>
        <section className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:gap-20 ">
            {hotels.map((hotel: Hotel) => {
                    return (
                        <HotelLisItem hotel={hotel} key={hotel.id}  />
                    )
                })
            }
        </section>
    </div>
  );
}
