import { Hotel } from "@/types/Hotel"
import DetailRow from "../DetailListItem/DetailRow"
import Image from "next/image"
import Link from "../Link"
import { getFormattedStatus } from "@/helpers/format/dictionary/status"
import { getFormattedDate } from "@/helpers/format/data"
import { getFormattedPrice } from "@/helpers/format/money"


type HotelListItemProps = {
    hotel:  Hotel
}



export const HotelLisItem = ({ hotel }: HotelListItemProps) => {
    return(
        <Link href={`/minhas-hospedagens/${hotel.id}/reservas`} className="flex w-full mt-5">
            <Image
                src={hotel?.image ? `/uploads-hotels/${hotel?.image}` : '/no-hotel.jpg'}
                alt={`Foto do hotel ${hotel?.name || ''}`}
                width={300}
                height={300}
                className="rounded-lg w-32 h-32 object-cover"
            />
            <div className="w-full flex flex-col justify-between ml-4">
            <b>{hotel?.name}</b>
                <DetailRow title="Endereço" description={hotel?.address} className="mt-1"/>
                <DetailRow title="Preço" description={getFormattedPrice(hotel?.price)} className="mt-1" />

            </div>
   
            
        </Link>
    )
}

export default HotelLisItem