'use client';

import { reserveHotelById } from "@/app/api/reservations/actions";
import Alert from "@/app/components/Alert";
import Button from "@/app/components/Button";
import CalendarField from "@/app/components/CalendarField"
import TextField from "@/app/components/Form/TextField"
import { getFormattedPrice } from "@/helpers/format/money";
import { Hotel } from "@/types/Hotel"
import React, { ChangeEvent, useActionState } from "react"


type HotelBookingFormProps = {
    hotel: Hotel
}


const getNightsInHotel = (checkinDate: string | null, checkoutDate: string | null): number => {
    if (!checkinDate || !checkoutDate) return 0;

    const start = new Date(checkinDate).getTime();
    const end = new Date(checkoutDate).getTime();

    const diffInMs = end - start;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays
}

const initialState = {message: '', error: false}
const HotelBookingForm = ({ hotel }: HotelBookingFormProps) => {
    const [state, formAction] = useActionState(reserveHotelById, initialState);
    const today = new Date().toISOString().substring(0, 10);
    const [ checkinDate, setCheckinDate ] = React.useState<string | null>(null);
    const [ checkoutDate, setCheckoutDate ] = React.useState<string | null>(null);
    const estimatedPrice = getNightsInHotel(checkinDate, checkoutDate) * hotel.price;


    return (
        <form action={formAction} className="flex w-full flex-col mt-2">   
        <TextField
            id="hotelId"
            name="hotelId"
            defaultValue={hotel.id}
            label="ID do hotel"
            readOnly
            hidden
        />
        <div className="w-full flex">
            <CalendarField
                id="checkIn"
                name="checkIn"
                label="Data de check-in"
                className="w-full m-5"
                min={today}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setCheckinDate(e.target.value)
                }}
                required
            />
            <CalendarField
                id="checkOut"
                name="checkOut"
                label="Data de check-out"
                className="w-full m-5"
                min={checkinDate ?? today}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setCheckoutDate(e.target.value)
                }}
                required
            />
        </div>
        <div className="flex w-full justify-between font-bold mt-6">
            <span>Valor Total</span>
            <span>{getFormattedPrice(estimatedPrice)}</span>
        </div>
        <hr/>
        {state.error && (
            <Alert type="error">
                {state.message}
            </Alert>
        )}
        <Button
        appearance="primary"
        type="submit"
        className="w-full mt-6"
        disabled={!checkinDate || !checkoutDate}
        >
        Reservar
        </Button>
        </form>
    )
}

export default HotelBookingForm;