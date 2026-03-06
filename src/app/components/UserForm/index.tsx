"use client";
import { PasswordFields } from "@/app/cadastrar/PasswordFields";
import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import RadioGroup from "../Form/RadioGroup";
import Button from "../Button";
import Alert from "../Alert";
import { useActionState } from "react";
import { signup } from "@/app/api/auth/signup/actions";
import { updateProfile } from "@/app/api/users/actions";
import { User } from "@/types/User";

const initialState = { error: false, message: "" };

type UserFormProps = {
  user?: User;
  avatar?: boolean
};

const UserForm = ({ user, avatar = false }: UserFormProps) => {
  const action = user ? updateProfile : signup;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <>
      {state.error && <Alert type="error">{state.message}</Alert>}
      <form className="w-full" action={formAction}>
        <ImageField
          name="avatar"
          label="Selecionar foto"
          id="avatar"
          defaultValue={user?.avatar as string}
          avatar={false}
        />
        <TextField
          label="Digite o nome completo"
          type="text"
          id="name"
          name="name"
          className="mt-2"
          defaultValue={user?.name}
          required
        />
        <TextField
          label="E-mail"
          type="email"
          id="email"
          name="email"
          className="mt-2"
          defaultValue={user?.email}
          required
        />
        {!user && (
          <>
            <PasswordFields />
            <RadioGroup
              options={[
                { label: "Sim", value: "ADMIN", id: "yes" },
                { label: "Não", value: "USER", id: "no" },
              ]}
              name="role"
              label="Você deseja anunciar hospedagens?"
              className="my-2"
            />
          </>
        )}
        <Button appearance="primary" type="submit" className="mt-2" disabled={pending}>
          {user ? "Editar" : "Cadastrar-se"}
        </Button>
      </form>
    </>
  );
};

export default UserForm;