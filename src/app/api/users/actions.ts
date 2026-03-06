'use server';

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getHotelsByOwner } from "../hotels/actions";
import { getReservationsByUserId } from "../reservations/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function getProfile() {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) redirect('/login');

    const { data: user } = await axios.get(`${process.env.API_BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (user.role === 'ADMIN') {

        const hotels = await getHotelsByOwner();

        return { user, hotels, reservations: null};
    }else {

        const reservations = await getReservationsByUserId();

        return { user, hotels: null, reservations }
    }

}


export async function updateProfile(prevtate: any, formData: FormData){
    const token = (await cookies()).get('access_token')?.value;
    const session = await getServerSession(authOptions); 
    if (!token || !session?.user.id) redirect('/login');


    try {
        
        const avatar = formData.get('avatar') as File;
    
     
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
        }
    
        const { data } = await axios.patch(`${process.env.API_BASE_URL}/users/${session.user.id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    
        if (avatar.size) {

            const formDataAvatar = new FormData();
            formDataAvatar.set('avatar', avatar)
            await axios.post(`${process.env.API_BASE_URL}/users/avatar`, formDataAvatar, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
        }

    } catch (error: any) {
        return { error: true, message: 'Não foi possível cadastrar usuário' }
    }

    redirect('/perfil')

}