'use client';

import ImageField from "../Form/ImageField";
import TextField from "../Form/TextField";
import Button from "../Button";
import MoneyField from "../Form/MoneyField";
import { useActionState } from "react";
import { createHotel, updateHotel } from "@/app/api/hotels/actions";
import Alert from "../Alert";
import { Hotel } from "@/types/Hotel";

const initialState = { message: '', error: false}

type HotelFormProps = {
    hotel?: Hotel
}

const HotelForm = ({ hotel }: HotelFormProps ) => {

  const action = hotel ? updateHotel : createHotel

  const [state, formAction] = useActionState(action, initialState);

  return (
    <>
      <form className="w-full" action={formAction}>
        {state.error && <Alert type="error">{state.message}</Alert>}
        <ImageField name="image" type="field" label="Selecionar foto" id="image" defaultValue={hotel?.image ?? undefined} />
        {hotel?.id && (
            <TextField 
            name="id"
            label="id"
            type="text"
            defaultValue={hotel?.id}
            hidden
            />
        )}
        
        <TextField
          label="Nome da hospedagem"
          type="text"
          id="name"
          name="name"
          className="mt-2"
          defaultValue={hotel?.name}
          required
        />
        <TextField
          label="Descrição da hospedagem"
          type="text"
          id="description"
          name="description"
          className="mt-2"
          defaultValue={hotel?.description}
          required
        />
        <TextField
          label="Endereço"
          type="text"
          id="address"
          name="address"
          className="mt-2"
          defaultValue={hotel?.address}
          required
        />
        <MoneyField
          label="Preço da diária"
          className="mt-2"
          defaultValue={hotel?.price}
          required
        />

        <Button
          appearance="primary"
          type="submit"
          className="mt-2"
        >
          {hotel ? "Editar" : "Cadastrar"}
        </Button>
      </form>
    </>
  );
};

export default HotelForm;
