import { api } from "@/services/api";
import Orders from "./components/orders/index";
import getCookieServer from "@/lib/cookieServer";
import OrderProps from "@/lib/order.type";

//Função Assícrona para resgatar todos os Pedidos Realizados
async function getOrders(): Promise<OrderProps[] | []> { //Vai retornar um array de objetos Orders ou um array vazio

    const token = await getCookieServer();

    try {
        const response = await api.get("/order/listOrders", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data);

        return response.data.orders || [];
    } catch (error) {
        console.log(error);
        return [];
    }    
}

export default async function Dashboard(){

    const orders = await getOrders();

    console.log(orders);

    return(
        <>
            {/* <Orders/> */}
            <Orders orders={orders}/>
        </>
    );
}