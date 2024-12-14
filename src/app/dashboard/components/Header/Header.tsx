"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoImg from "/public/logo.svg"; 
import { LogOutIcon } from "lucide-react"; 
import { deleteCookie } from "cookies-next"; // -> Componente Next que realiza a deleção dos Cookies
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header() {

    //Istância do useRouter
    const router = useRouter();

    //Função Assícrona de LogOut do Usuário
    async function handleLogout() {

        //Deleta o cookie que foi criado anteriormente (session)
        deleteCookie("session", { path: "/" });

        //Alerta Toaster / Sonner
        toast.success("Logout Realizado Com Sucesso!");

        //e redireciona para a rota '/' (Página Inicial)
        router.replace("/");
    }

    return(
        // <>
        //     <h1>TESTE</h1> 
        // </>
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        src={logoImg}
                        alt="Logo do Sujeito Pizza"
                        width={190}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                    <nav>
                        <Link href="/dashboard/category">
                            Categoria
                        </Link>

                        <Link href="/dashboard/product">
                            Produto
                        </Link>

                        <form action={handleLogout}>
                            <button type='submit' title="logout">
                                <LogOutIcon
                                    size={24}
                                    color="#FFF"
                                />
                            </button>
                        </form>
                    </nav> 
            </div>
        </header>
    );
}