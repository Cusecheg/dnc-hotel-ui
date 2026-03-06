"use client";

import { recoverPassword } from "@/app/api/auth/password/route";
import { PasswordFields } from "@/app/cadastrar/PasswordFields";
import Alert from "@/app/components/Alert";
import Button from "@/app/components/Button";
import TextField from "@/app/components/Form/TextField";
import Image from "next/image";
import { useActionState } from "react";
import Link from "@/app/components/Link";

const RecoverPassword = () => {
  const initialState = { message: "" };

  const [state, formAction, pending] = useActionState(
    recoverPassword,
    initialState,
  );

  return (
    <form
      className="flex flex-col items-center justify-center w-full"
      action={formAction}
    >
      {state?.message && <Alert type="error">{state.message}</Alert>}
      <Image
        src="/recover-password.svg"
        alt="Esqueci minha senha"
        width={172}
        height={167}
        className="mt-6"
      />

      {state?.success ? (
        <>
          <span className="text-xl mt-4">Senha alterada com sucesso!</span>
          <Link href="/login" className="my-6">
            Realizar login
          </Link>
        </>
      ) : (
        <>
          <TextField
            label="Token de confirmação"
            type="text"
            id="token"
            name="token"
            className="mt-6"
            required
          />
          <PasswordFields />

          <Button
            appearance="primary"
            type="submit"
            className="mt-8"
            disabled={pending}
          >
            Enviar e-mail
          </Button>
        </>
      )}
    </form>
  );
};

export default RecoverPassword;
