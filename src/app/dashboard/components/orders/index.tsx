//Componente que exibirá as Orders (Pedidos) na tela de DashBoard

"use client";

import { RefreshCw } from "lucide-react";
import styles from "./styles.module.scss";
import OrderProps from "@/lib/order.type";
import ModalOrder from "../modal";
import { use, useState } from "react";
import { OrderContext } from "@/providers/order";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface OrderPropsComponent{
    orders: OrderProps[];
}

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
    order: {
        id: string;
        table: number;
        name: string;
        status: boolean;
        draft: boolean;
    }
};

export default function Orders({ orders }: OrderPropsComponent) {

    //State que gerencia a abertura e fechamento do Modal a partir do Provider

    const { isOpen, onRequestOpen, onRequestClose } = use(OrderContext);
    const [order, setOrder] = useState<OrderItemProps[]>([]);
    const token = getCookieClient();

    const router = useRouter();

    async function handleDetailOrder(order_id: string) {

        // console.log("CLICOU!");
        // alert("CLICOU!");

        // const response = await api.get("/", {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     },
        //     params: {
        //         order_id: order_id
        //     }
        // });


       await onRequestOpen(order_id);

    }

    function handleRefresh() {
        console.log("Refresh");
        router.refresh();
        toast.success("Pedidos Atualizados Com Sucesso!");
    }

    return (

        <>
            <main className={styles.container}>
                <section className={styles.containerHeader}>

                    <h1>Últimos Pedidos</h1>

                    <button title="RefreshCW" onClick={handleRefresh}>
                        <RefreshCw
                            size={24}
                            color="#3fffa3"
                        />
                    </button>
                </section>

                <section className={styles.listOrders}>
                    
                    {
                        orders.length === 0 && (
                            <span className={styles.emptyItem}>
                                Nenhum Pedido Aberto no Momento...
                            </span>
                        )
                    }

                    {
                        orders.map( (order) => (
                            <button 
                                key={order.id} 
                                className={styles.orderItem}
                                onClick={ () => handleDetailOrder(order.id) }
                            >
                                <div className={styles.tag}></div>
                                    <span>Mesa {order.table}</span>
                            </button>
                        ))
                    }
                </section>
             </main>

            {
                isOpen && (
                    <ModalOrder/>
                )
            }
        </>

    );
}