// Página de Login (Página Inicial da Aplicação)

//Importações

//Importações do Next
import Image from "next/image"; // -> Componente do Next para Imagens
import Link from "next/link"; // -> Componente do Next para Linkamentos
import { cookies } from "next/headers"; // -> Componente do Next para Cookies
 

import styles from "./page.module.scss";
import logoImg from "/public/logo.svg";
import { api } from "../services/api"; // -> URL Base do Axios
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function Page() {

  //Método Chamado na Ação do Form de Login
  async function handleLogin(formData: FormData){

    // Diretiva do Next para renderizar os componentes do lado do Servidor (SSR)
    "use server";

    //Resgatando os campos do formulário com a classe FormData do JS
    const email = formData.get("email");
    const password = formData.get("password");

    if(email === "" || password === ""){
      console.log("Preencha Todos os Campos!");
      // toast.warning("Preencha Todos os Campos!"); 
      return;
    }

    try {
      const response = await api.post("/session",{
        email: email,
        password: password
      });

      //Se não existir um Token JWT (se as credenciais estiverem inválidas) -> Não Redirecionar
      if(!response.data.token){
        return;
      }

      console.log(response.data); 

      const expressTime = 60 * 60 * 24 * 30 * 1000; // Tempo Equivalente a 30 Dias 

      //Armazenando o Token nos Cookies

      const cookieStore = await cookies(); //OBS: Precisa ser utilizado como Promise. então precisa de um await / async function. 
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime, // validade do Cookie
        path: "/", // Todas as Rotas com '/'
        httpOnly: false, //Não ser somente HTTP (ser HTTPS)
        secure: process.env.NODE_ENV === "production" //Propiedade de Segurança (aplicação na fase de produção)
      })
      
    } catch (error) {
      console.log(`Error ao realizar a Requisição: ${error}`);
      return;
    }

    // toast.success("Login Realizado Com Sucesso!");
    //Redireciona para a tela de dashboard (/dashboard)
    redirect("/dashboard");

  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo da Pizzaria"
        />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input 
                type="email" 
                name="email" 
                id="email"
                placeholder="Digite seu Email"
                className={styles.input}
                // required
            />

            <input 
                type="password" 
                name="password" 
                id="password"
                placeholder="**************"
                className={styles.input}
                // required
            />

            <button type="submit" className={styles.button}>
              Acessar
            </button>

            <Link href="/signup" className={styles.text}>
              Não Possui uma Conta? Cadastre-se
            </Link>
          </form>
        </section>
      </div>
    </>      
  );
}
