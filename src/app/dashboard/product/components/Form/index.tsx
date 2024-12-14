"use client";

import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/Button";
import { api } from "@/services/api";
import { headers } from "next/headers";
import { getCookieClient } from "@/lib/cookieClient"; //Por ser um componente 'use client' / CSR , pode-se utilizar a função getCookieClient
import { error } from "console";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface CategoryProps{
    id: string;
    name: string;
};

interface FormProps{
    categories: CategoryProps[]
};

export function Form({ categories }: FormProps) {

    const router = useRouter();

    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>("");
    const [name, setName] = useState<string>("");

    async function handleRegisterProduct(formData: FormData) {

        const categoryIndex = formData.get("category");
        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");

        if(!name || !categoryIndex || !price || !description || !image){
            console.log("Preencha todos os campos!");
            toast.warning("Preencha todos os campos!");
            return;
        }

        // console.log("handleRegisterProduct");

        const data = new FormData();

        data.append("name",name);
        data.append("price",price);
        data.append("description",description);
        data.append("category_id", categories[Number(categoryIndex)].id);
        data.append("file", image);

        const token = getCookieClient(); //Por ser um Componente CSR, não é necessário o uso de AWAIT / ASYNC

        console.log(data);

        const response = await api.post("/product", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).catch((error) => {
            console.log("Erro: " + error);
            toast.error("Não Foi Possível Cadastrar Este Produto!");
        });

        // console.log(response.data);

        //Alerta de Sucesso -> Toaster / Sonner
        toast.success("Produto Registrado Com Sucesso!");

        //Redireciona para a página de Dashboard
        router.push("/dashboard");
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        if(e.target.files && e.target.files[0]){

            const image = e.target.files[0];

            // console.log(image);

            if(
                image.type !== "image/jpeg" && 
                image.type !== "image/png"  && 
                image.type !== "image/jpg"
            ){
                console.log("Formato Inválido de Imagem!");
                toast.error("Formato Inválido de Imagem!");
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image)); // URL.createObjectURL(image) -> Gera uma URL de Preview da image

            // console.log(image);

        }
    }

    return (
        <main className={styles.container}>

            <h1>Novo Produto</h1>

            <form action={handleRegisterProduct} className={styles.form}>
                <label htmlFor="file" className={styles.labelImage}>
                    <span>
                        <UploadCloud
                            size={30}
                            color="#FFF"
                        />
                    </span>

                    <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg"
                        name="file" 
                        id="file" 
                        onChange={handleFile}
                    />

                    { //Se o state previewImage for true, quer dizer que ele contém uma url de image (foi enviado uma image pelo input do form)
                        previewImage && (
                            <Image
                                alt="Imagem da Preview"
                                src={previewImage}
                                className={styles.preview}
                                fill={true}
                                quality={100}
                                priority={true}
                            />
                        )
                    }

                </label>

                <select title="selectCategory" name="category" id="category">
                    {
                        categories.map( (category, index) => (
                            <option key={category.id} value={index}>{category.name}</option>
                        ))
                    }
                </select>

                <input 
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nome do Produto..."
                    // required
                    className={styles.input}
                />

                <input 
                    type="text"
                    name="price"
                    placeholder="Preço do Produto..."
                    // required
                    className={styles.input}
                />

                <textarea 
                    className={styles.input}
                    placeholder="Digite a Descrição do Produto..."
                    // required
                    name="description"
                    id="description"
                ></textarea>

                <Button name="Cadastrar Produto"/>
                
            </form>
        </main>
    );
}