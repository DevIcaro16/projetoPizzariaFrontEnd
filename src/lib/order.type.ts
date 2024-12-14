//Arquivo TS contendo a interface com as propiedades do pedido

export default interface OrderProps{
    id: string;
    table: number;
    name: string;
    draft: boolean;
    status: boolean;
};