import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { OrderContext } from "@/providers/order";
import { use } from "react";
import calculateTotalOrder from "@/lib/helper";
import Image from "next/image";

export default function ModalOrder() {

    const { onRequestClose, order, finishOrder } = use(OrderContext);

    function handleCloseModal() {
        // alert("CLICOU PRA FECHAR!");
        onRequestClose();
    }

    async function handleFinishOrder() {
        console.log("Concluir Order/Pedido!");

        const response = await finishOrder(order[0].Order.id);
        console.log(response);
    }

    // console.log(order[0].Order.table);

    return(
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={handleCloseModal}>
                    <X 
                        size={40}
                        color="#FF3f4b"
                    />
                </button>

                <article className={styles.container}>

                    <h2>Detalhes Do Pedido</h2>

                    <span className={styles.table}>
                        Mesa <b>{order[0].Order.table}</b>
                    </span>

                    {
                        order[0].Order?.name && (
                            <span className={styles.name}>
                                Nome Da Mesa - <b>{order[0].Order.name}</b>
                            </span>
                        ) 
                    }

                    {
                        order.map( order => (
                            <section key={order.id} className={styles.item}>

                                <span>
                                    Qtd: {order.amount} - <b>{order.Product.name}</b> - R$ {parseFloat(order.Product.price).toFixed(2) * order.amount}
                                </span>
                                
                                <span className={styles.description}>
                                    {order.Product.description}
                                </span>

                                <Image 
                                    src={`${order.Product.banner}`} 
                                    alt={order.Product.name}
                                    className={styles.img}
                                    width={100}
                                    height={100}
                                    quality={100}
                                    priority={true}
                                />

                             </section>
                        ) )
                    }

                    <h3 className={styles.total}>Valor Total Do Pedido: R$ {calculateTotalOrder(order)} </h3>

                        <button className={styles.buttonOrder} onClick={handleFinishOrder}>
                            Concluir Pedido
                        </button>

                </article>
            </section>
        </dialog>
    );
}   