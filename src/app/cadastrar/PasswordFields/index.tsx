'use client';

import TextField from "../../components/Form/TextField";
import { useState } from "react";



export const PasswordFields = () => {

    const [passwordMatches, setPasswordMatches] = useState<boolean | null>(null);


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = e.target.value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        if (confirmPassword && password === confirmPassword) {
            setPasswordMatches(true);
        } else {
            setPasswordMatches(false);
        }
    }


    return (
<>

        <TextField
            label="Senha"
            type="password"
            id="password"
            name="password"
            className="mt-2"
            required
        />
        <TextField
            label="Confirme a senha"
            type="password"
            id="confirm_password"
            name="confirm_password"
            className="mt-2"
            required
            onChange={handlePasswordChange}
            error={passwordMatches === false ? "As senhas não coincidem." : undefined}
        />
</>
    )
}