'use client';

import Button from "@/app/components/Button";
import TextField from "@/app/components/Form/TextField";
import Image from "next/image";
import Link from "next/link";
import { forgotPassword } from "@/app/api/auth/password/route";
import { useActionState } from "react";
import Alert from "@/app/components/Alert";


const initialState = { message: ''};

const ForgotPassword = () => {

    const [state, formAction, pending] = useActionState(forgotPassword, initialState);

    return(
      <form className="flex flex-col items-center justify-center w-full" action={formAction}>
        {state?.message && <Alert type="error">{state.message}</Alert>}
        <Image
            src="/forgot-password.svg"
            alt="Ilustração esqueci minha senha"
            width={172}
            height={167}
            className="mt-6"
        />

        <TextField
            label="E-mail"
            type="text"
            id="email"
            name="email"
            className="mt-6"
            required
        />

        <Button appearance="primary" type="submit" className="mt-8" disabled={pending}>
            Enviar e-mail
        </Button>
      </form>
    );
}

export default ForgotPassword;