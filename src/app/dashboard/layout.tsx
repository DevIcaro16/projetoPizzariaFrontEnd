import { OrderProvider } from "@/providers/order";
import Header from "./components/Header/Header";

export default function DashboardLayout(
    { children } : { children: React.ReactNode}
) {
    return(
        <>
            <Header/>
            <OrderProvider>
                {children}
            </OrderProvider>
        </>
    );
}