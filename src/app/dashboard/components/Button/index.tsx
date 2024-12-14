"use client";

import { useFormStatus } from "react-dom"; // -> Componente do React para manipular o button a partir do status do envio do form
import styles from "./styles.module.scss";

interface ButtonProps{
    name: string;
}

export function Button({ name }: ButtonProps) {

    const { pending } = useFormStatus();

    return(
        <button type="submit" disabled={pending} className={styles.button}>
            {
                pending ? "Carregando..." : name 
            }
        </button>
    );
}