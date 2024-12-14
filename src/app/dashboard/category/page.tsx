import { api } from "@/services/api";
import { Button } from "../components/Button";
import styles from "./styles.module.scss";
import getCookieServer from "@/lib/cookieServer";
import { redirect } from "next/navigation";

export default function Category() {

    async function handleRegisterCategory(formData:FormData) {
        "use server";  {/**Função que é chamada na ação do form é do tipo SSR / use server; */}

        // console.log("handleRegisterCategory");

        //Resgatando os campos do formulário com a classe FormData do JS
        const name = formData.get("name");

        if(name === ""){
            return;
        }

        const dataForm = {
            name: name,

        };

        //Resgatando o token do Browser
        const token = await getCookieServer(); //Await para aguardar o token da sessão ser armazenado

        const response = await api.post("/category", dataForm, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((error) => {
            console.log(error);
            return;
        });

        // console.log(name);
        // console.log(response.data);

        redirect("/dashboard");
    }

    return (
        <main className={styles.container}>

            <h1>Nova Categoria</h1>

            <form action={handleRegisterCategory} className={styles.form}>
                <input 
                    type="text"
                    name="name"
                    placeholder="Nome da Categoria, Ex: Coca-Cola 2L"
                    className={styles.input} 
                    required
                />

                <Button name="Cadastrar" /> {/**Componente Button é do tipo CSR / use client; */}
            </form>
        </main>
    );
}