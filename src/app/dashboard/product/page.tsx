import { api } from "@/services/api";
import { Form } from "./components/Form";
import getCookieServer from "@/lib/cookieServer";

export default async function Product() {

    const token = await getCookieServer(); //Await para aguardar o token da sessão ser armazenado


    const response = await api.get("/categories", { //Rota no Back-End que vai resgatar todas as Categorias
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    
    // console.log("Depois " + token);
    console.log(response.data);

    return (
        <main>
            <Form
                categories={response.data.categories}
            />
        </main>
    );
}