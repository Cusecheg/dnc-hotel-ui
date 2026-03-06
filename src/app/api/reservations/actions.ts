'use server';
import { Hotel } from "@/types/Hotel";
import { Reservation, ReservationStatus } from "@/types/Reservation";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function reserveHotelById(prevState: any, formData: FormData) {

    let reservationId = '';

    const token = (await cookies()).get('access_token')?.value;

    if (!token){
        redirect('/login');
    }
    
    try {
        
    
        const payload = {
            hotelId: Number(formData.get('hotelId')),
            checkIn: formData.get('checkIn') as string,
            checkOut: formData.get('checkOut') as string,
        }

    
        const { data } = await axios.post(`${process.env.API_BASE_URL}/reservations`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        reservationId = data.id;
        
    } catch (error: any) {
        return {...prevState, message: 'Ocorreu um erro ao reservar o hotel. Por favor, tente novamente.', error: true}
    }

    redirect(`/reservas/${reservationId}/sucesso`);
}

export async function getReservationById(id: number) {
    const token = (await cookies()).get('access_token')?.value;

    if (!token){
        redirect('/login');
    }

    const { data } = await axios.get(`${process.env.API_BASE_URL}/reservations/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data;
}

export async function getReservationsByUserId() {
    const token = (await cookies()).get('access_token')?.value;

    if (!token){
        redirect('/login');
    }

    const { data } = await axios.get(`${process.env.API_BASE_URL}/reservations/user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data;


}


export async function getReservationsByHotel(hotelId: number): Promise<Reservation[]> {
    const token = (await cookies()).get('access_token')?.value;

    if (!token){
        redirect('/login');
    }

    const { data } = await axios.get(`${process.env.API_BASE_URL}/reservations/hotel/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data;
}

export async function updateReservationStatus(reservationId: Number, status: ReservationStatus){
    const token = (await cookies()).get('access_token')?.value;

    if (!token){
        redirect('/login');
    }

    const { data } = await axios.patch(`${process.env.API_BASE_URL}/reservations/${reservationId}`, { status }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )

    return data
}