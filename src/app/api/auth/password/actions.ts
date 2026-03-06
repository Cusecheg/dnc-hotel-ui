"use server"
import axios from "axios";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

export async function forgotPassword(prevState: any, formData: FormData) {
    try {
        const payload = { "email": formData.get('email') };
    
        const { data } = await axios.post(`${API_BASE_URL}/auth/forgot-password`, payload);


    } catch (error: any) {
        return { ...prevState, message: 'Erro ao enviar e-mail' };
    }

    redirect('/recuperar-senha')

}

export async function recoverPassword(prevState: any, formData: FormData) {
    try {
        const payload = {
            "token": formData.get('token'),
            "password": formData.get('password'),
        }
    
        const { data } = await axios.patch(`${API_BASE_URL}/auth/reset-password`, payload);
        // return { success: true, result: data };
    } catch (error) {
        return { ...prevState, message: 'Erro ao atualizar a senha' };
    }
    
    redirect('/recuperar-senha')    
}