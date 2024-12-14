//Arquivo TS para realizar o cálculo total do Pedido e Imprimir no Modal

import { OrderItemProps } from "@/app/dashboard/components/orders";

export default function calculateTotalOrder(orders: OrderItemProps[]) {
    return orders.reduce( (total, order) => {
        const orderTotal = parseFloat(order.Product.price) * order.amount;
        return total + orderTotal;
    }, 0);
}