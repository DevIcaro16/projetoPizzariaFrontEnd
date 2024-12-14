//Componente que Controlará o Uso, Abertura e Fechamento do Outro Componente Modal

"use client";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react"
import { toast } from "sonner";


export interface OrderItemProps{
    id: string;
    amount: number;
    created_at: string;
    updated_at: string;
    order_id: string;
    product_id: string;
    Product: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        category_id: string;
    };
    Order: {
        id: string;
        table: number;
        name: string;
        status: boolean;
        draft: boolean;
    }
};


type OrderContextData = {

    //OBS: void -> Não Retorna Nada / Promise<void> -> async / await Sem Retorno
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
    children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderItemProps[]>([]);

    const router = useRouter();

    async function onRequestOpen(order_id: string) {

        console.log("ID Do Pedido: " + order_id);

        const token = getCookieClient();

        const response = await api.get("/order/detailsOrder", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                order_id: order_id
            }
        });

        console.log(response.data.order);
        setOrder(response.data.order);
        setIsOpen(true);
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    //Função Assícrona que realizará a requisição de finalização do pedido
    async function finishOrder(order_id: string) {
        const token = getCookieClient();

        const data = {
            order_id: order_id
        };

        try {
            const response = await api.put("/order/finish", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
        } catch (error) {
            console.log("Erro: " + error);
            toast.error("Erro Ao Finalizar Seu Pedido!");
            return;
        }

        //Alerta de Sucesso na Finalização do Pedido
        toast.success("Pedido Finalizado Com Sucesso!");

        //useRouter Para Dar Um Refresh na Página (Atualizar os Pedidos)
       router.refresh()

       //State para Fechar o Modal
       setIsOpen(false); 
       
    }

    return(
        <OrderContext.Provider
            value={{ 
                isOpen,
                onRequestOpen,
                onRequestClose,
                order,
                finishOrder
             }}
        >
        {children}
        </OrderContext.Provider>
    );
}
