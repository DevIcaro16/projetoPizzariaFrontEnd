// Página de Cadastro 

//Diretiva do Next para renderizar os componentes do lado do Client / Browser (CSR)
// "use client";

//Importações

//Importações do Next
import Image from "next/image"; // -> Componente do Next para Imagens
import Link from "next/link"; // -> Componente do Next para Linkamentos
import { redirect } from "next/navigation"; // -> Componente do Next para Redirecionamento entre as Rotas

import styles from "../page.module.scss";
import logoImg from "/public/logo.svg";
import { api } from "../../services/api"; // -> URL Base do Axios

export default function Signup() {

    //Método Chamado na Ação do Form de Cadastro
    async function handleRegister(formData: FormData) {  // Server Actions must be async functions

        // Diretiva do Next para renderizar os componentes do lado do Servidor (SSR)
        "use server";

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        // Se for SSR, a impressão é feita no console do servidor (VSCODE), se for CSR no console do Browser

        // console.log(name);
        // console.log(email);
        // console.log(password);

        if(name === "" || email === "" || password === ""){
            console.log("Preencha Todos os Campos!");
            return;
        }

        //Try - Catch para Realizar a Requisição de Criação do Usuário

        try {
            await api.post("/users",{
                name,
                email,
                password
            });
        } catch (error) {
            console.log(`Error ao realizar a Requisição: ${error}`);
        }

        //Redireciona para a tela de Login (/)
        redirect("/");
    }

    return(
        <>
        <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo da Pizzaria"
        />

        <section className={styles.login}>

        <h1>Criando Sua Conta</h1>

          <form action={handleRegister}>

            <input 
                type="text" 
                name="name" 
                id="name"
                placeholder="Digite seu Nome"
                className={styles.input}
                required
            />
            <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="Digite seu Email"
                className={styles.input}
                required
            />

            <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="**************"
                className={styles.input}
                required
            />

            <button type="submit" className={styles.button}>
              Cadastrar
            </button>

            <Link href="/" className={styles.text}>
              Já Possui uma Conta? Realize Seu Login
            </Link>
          </form>
        </section>
      </div>
        </>
    );
}