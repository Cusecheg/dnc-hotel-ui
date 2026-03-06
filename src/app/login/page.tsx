'use client';

import React from "react";
import Button from "../components/Button";
import TextField from "../components/Form/TextField";
import Link from "../components/Link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if(response?.ok){
      router.push('/');
    }else{
      alert('Erro ao realizar login');
    }
 }


  return (
    <article className="max-w-96 w-full flex justify-center items-center flex-col py-4 px-6 border border-light-grey-500 rounded-2xl">
      <span>Entrar ou cadastrar-se</span>
      <h3> 
        Bem vindo a DNC Hotel!
      </h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="E-mail"
          type="email"
          name="email"
          className="mt-2"
          required
        />
        <TextField
          id="password"
          label="Senha"
          type="password"
          name="password"
          className="mt-2"
          required
        />
        <Button type="submit" appearance="primary" className="mt-2">Continuar</Button>
      </form>
      <span className="my-2">ou</span>
      <Link href="/cadastrar" className="my-2 text-blue-500">Cadastre-se</Link>
      <Link href="/esqueci-minha-senha" className="my-2 text-blue-500">Esqueci minha senha</Link>
    </article>
  );
}
