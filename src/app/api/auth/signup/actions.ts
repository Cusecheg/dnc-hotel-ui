'use server';
import axios from "axios";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.API_BASE_URL ||'http://localhost:3000';

export async function signup(prevState: any, formData: FormData) {

    try {

        const avatar = formData.get('avatar') as any;
        const formDataAvatar = new FormData();
        formDataAvatar.set('avatar', avatar)
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role'),
        }
    
        const { data: { access_token }} = await axios.post(`${API_BASE_URL}/auth/register`, payload);
    
        if (avatar.size) {
            await axios.post(`${API_BASE_URL}/users/avatar`, formDataAvatar, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
    
        }
        
    } catch (error) {
              return { error: true, message: 'Não foi possível cadastrar usuário' }
    }


    redirect('/login')
}