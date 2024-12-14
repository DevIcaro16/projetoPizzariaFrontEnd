//Arquivo TS para configurar o Middleware para as Rotas Privadas

import { NextRequest, NextResponse } from "next/server"; // -> Componentes do Next de requisição e resposta de servidor
import getCookieServer from "./lib/cookieServer"; // -> Função Local que resgata o Token (servidor)
import { api } from "./services/api"; // -> URL Base do Axios
import { toast } from "sonner";

export default async function Middleware(req: NextRequest) {
    // console.log("Passou no Middleware!");

    const { pathname } = req.nextUrl;

    if(pathname.startsWith("/_next") || pathname === ""){
        return NextResponse.next();
    }

    const token = await getCookieServer(); //É uma Promise (esquema Await e Async Function)
    console.log(token);

    //Verifica se está na rota 'dashboard'
    if(pathname.startsWith("/dashboard")){
        //Verifica se o token é inválido
        if(!token){
            //Redireciona para a rota '/' -> Página Inicial
            return NextResponse.redirect(new URL("/", req.url));
        }

        const isValid = await validadeToken(token);

        if(!isValid){
            // toast.warning("Token Expirou ou é Inválido!");
            return NextResponse.redirect(new URL("/", req.url));
        }


    }

    //Se tudo for validado, continua o fluxo de redirecionamento
    return NextResponse.next();
}

//Função para validação do Token
async function validadeToken(token: string) {
      if(!token){
        return false;
      }

      try {

        await api.get("/me", { //Rota de validação no Back-End (NodeJS)
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        return true;

      } catch (error) {

        console.log(error);
        return false;

      }
}

