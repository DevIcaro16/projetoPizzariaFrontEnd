//Arquivo TS para lidar com os Cookies (Cliente)

import { getCookie } from "cookies-next";

export function getCookieClient() {

    const token = getCookie("session"); //Resgat o token 'Session'

    return token; //Retorna o Token
}