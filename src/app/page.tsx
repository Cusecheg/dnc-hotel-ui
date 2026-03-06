import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "./components/Link";
import Pagination from "./components/Pagination";
import { redirect } from "next/navigation";
import { getHotels } from "./api/hotels/actions";
import { Hotel } from "@/types/Hotel";
import { getFormattedPrice } from "@/helpers/format/money";



type HomeProps = {
  searchParams: Promise< {
    page?: string
    query?: string
  }>
}


const LIMIT = 3;

export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession();

  
  if(!session?.user) redirect('/login');


  const params = await searchParams;
  const currentPage = Number(params?.page || 1);
  const { data, per_page, page, total } = await getHotels(currentPage, LIMIT);

  
  
  return (
    <div>
      <section className="grid grid-cols-1 gap-2 px-5 sm:grid-cols-2 sm:px-10 md:grid-cols-3 lg:grid-cols-3 mt-20">
      {data.map( (hotel: Hotel) => (

        <Link href={`/hotels/${hotel.id}`} className="text-black" key={hotel.id}> 
        <article className="flex flex-col">
          <div className="w-64 h-64">
            <Image
            src={hotel.image ? `/uploads-hotels/${hotel.image}` : '/no-hotel.jpg'}
            width={250}
            height={250}
            quality={100}
            alt={`Foto do hotel ${hotel.name}`}
            className="object-cover rounded-3xl h-48"
            />
            <h3 className="font-bold mt-0">{hotel.name}</h3>
            <span className="mt-2">{hotel.owner.name}</span>
            <span className="mt-2">
              <b> {getFormattedPrice(hotel.price)}</b>
            </span>

          </div>
        </article>
      </Link>
      ))}


      </section>
      <section className="flex justify-center mt-4 mb-8">
        <Pagination currentPage={page} 
        totalPages={Math.ceil(total / per_page)} 
        destination="/"
        />
      </section>
    </div>
  );
}
