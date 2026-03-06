
'use server'; 
import { Hotel, HotelPagination } from "@/types/Hotel";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export async function getHotels(page: number, limit: number): Promise<HotelPagination> {

    const token = (await cookies()).get('access_token')?.value;


    const { data } = await axios.get(`${API_BASE_URL}/hotels`, {
        params: {
            page,
            limit
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


    return data;

}

export async function getHotelDetail(id: number): Promise<Hotel> {
    const acccesToken = (await cookies()).get('access_token')?.value;

    const { data } = await axios.get(`${API_BASE_URL}/hotels/${id}`, {
        headers: {
            Authorization: `Bearer ${acccesToken}`
        }
    })

    return data;
}


export async function getHotelsByOwner() {
    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
        redirect('/login');
    }

    const { data } = await axios.get(`${API_BASE_URL}/hotels/owner`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data;
}

export async function createHotel(prevState: any, formData: FormData) {
    const token = (await cookies()).get('access_token')?.value;
    const image = formData.get('image') as File;

    if (!token) {
        redirect('/login');
    }


    try {

        const payload = {
            name: formData.get('name'),
            description: formData.get('description'),
            address: formData.get('address'),
            price: Number(formData.get('price'))
        }

        const { data } = await axios.post(`${process.env.API_BASE_URL}/hotels`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const hotelId = data.id;

        if (image?.size) {

            const imageFormData = new FormData();
            imageFormData.append('image', image)

            await axios.patch(`${process.env.API_BASE_URL}/hotels/image/${hotelId}`, imageFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

    } catch (error: any) {
        return {...prevState, message: "Não foi possivel cadastrar o hotel", error: true}
    }

    redirect('/minhas-hospedagens')

}


export async function getHotelById(id: Number): Promise<Hotel>{

    const token = (await cookies()).get('access_token')?.value;

    if (!token) {
        redirect('/login');
    }

    const { data } = await axios.get(`${process.env.API_BASE_URL}/hotels/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data

}



export async function updateHotel(prevState: any, formData: FormData) {
    const token = (await cookies()).get('access_token')?.value;
    
    if (!token) {
        redirect('/login');
    }
    
    try {


        const payload = {
            name: formData.get('name'),
            description: formData.get('description'),
            address: formData.get('address'),
            price: Number(formData.get('price'))
        }

        const image = formData.get('image') as File;
        const hotelId = formData.get('id');

        const { data } = await axios.patch(`${process.env.API_BASE_URL}/hotels/${hotelId}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        if (image?.size) {

            const imageFormData = new FormData();
            imageFormData.append('image', image)

            await axios.patch(`${process.env.API_BASE_URL}/hotels/image/${data.id}`, imageFormData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

    } catch (error: any) {
        return {...prevState, message: "Não foi possivel cadastrar o hotel", error: true}
    }

    redirect('/minhas-hospedagens')

}