//Arquivo TS para lidar com os Cookies (Servidor)

import { cookies } from "next/headers";

export default async function getCookieServer() {

    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value; //Resgata o Token 'Session' , ? -> Pode não existir / ser nulo

    return token || null; //Retorna o token (se existir) ou Nulo (se o token não existir)
}