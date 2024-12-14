//Arquivo que conterá a Base Url do Axios

import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API // -> URL da minha API / Back-End
});