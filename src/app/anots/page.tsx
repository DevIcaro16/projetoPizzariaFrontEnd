// "use client";

// import { ChangeEvent, useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation"; // Importar de 'next/navigation' ao invés de 'next/router'
// import { Eye, EyeOff } from "lucide-react";
// import axios from "axios";
// import Modal from "react-modal";
// import styles from "./page.module.scss";
// import logoImg from "/public/RUBY9.png";
// import Image from "next/image";
// import Link from "next/link";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import InputDate from "../components/inputDate";
// import CheckEmail from "../CheckEmail/page";
// import LoadingSpinner from "../LoadingSpinner/page";
// import MessageError from "../MessageError/page";
// import InputPassword from "../components/InputPassword";

// export default function ConfirmarCadastro() {

//   const [CNPJ, setCNPJ] = useState<string>("");
//   const [endereco, setEndereco] = useState<string>("");
//   const [bairro, setBairro] = useState<string>("");
//   const [cidade, setCidade] = useState<string>("");
//   const [telefone, setTelefone] = useState<string>("");
//   const [empresa, setEmpresa] = useState<string>("");
//   const [razao, setRazao] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [senha, setSenha] = useState<string>("");
//   const [confirmSenha, setConfirmSenha] = useState<string>("");
//   const [mesMovimentoInical, setMesMovimentoInicial] = useState('');  // Mês de Movimento Inicial
//   const [mesMovimentoFinal, setMesMovimentoFinal] = useState('');  // 
//   const [emissao, setEmissao] = useState('');  // 
//   const [versao, setVersao] = useState('');  // 
//   const [contrato, setContrato] = useState('');  // 
//   const [nomePagador, setNomePagador] = useState('');  //
//   const [proprietario, setProprietario] = useState('');  //

//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [tipoPlano, setTipoPlano] = useState("");
//   const [diffMes, setDiffMes] = useState<any>(true);
//   const [totalFuncionarios, setTotalFuncionarios] = useState<String>("");
//   const [valorPago, setValorPago] = useState("");
//   const [exibirValorPago, setExibirValorPago] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();  // Utiliza useSearchParams para acessar os parâmetros da URL
//   const token = searchParams.get('token');
//   const [tokenData, setTokenData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [result, setResult] = useState<boolean>(false);

//   async function fetchAndProcessTXT() {
//     try {
//       // Faz a requisição GET para obter o arquivo TXT
//       const response = await axios.get("http://micromoney.com.br/ruby/dados/rub_pla.php");
//       const data = response.data;

//       // Extração dos valores usando expressões regulares
//       const valorBaseMatch = data.match(/<LIC>(.*?)<\/LIC>/);
//       const taxaFUNMatch = data.match(/<FUN>(.*?)<\/FUN>/);
//       const taxaFATMatch = data.match(/<FAT>(.*?)<\/FAT>/);

//       // Converte os valores encontrados para números
//       const valorBase = valorBaseMatch ? parseFloat(valorBaseMatch[1]) : null;
//       const taxaFUN = taxaFUNMatch ? parseFloat(taxaFUNMatch[1]) : null;
//       const taxaFAT = taxaFATMatch ? parseFloat(taxaFATMatch[1]) : null;

//       // Valida se todos os valores foram extraídos corretamente
//       if (valorBase === null || taxaFUN === null || taxaFAT === null) {
//         throw new Error("Não foi possível extrair os valores do arquivo TXT.");
//       }

//       return { valorBase, taxaFUN, taxaFAT };
//     } catch (error: any) {
//       console.error("Erro ao buscar ou processar o TXT:", error.message);
//       return null;
//     }
//   }



//   useEffect(() => {
//     if (token) {
//       // Quando o token está disponível, faça a requisição para verificar o token
//       const verifyToken = async () => {
//         try {
//           const response = await axios.post('http://144.217.248.124:3200/verificarToken', { token });
//           if (response.data.valid) {
//             setTokenData(response.data.decoded); // Armazena os dados decodificados
//             setLoading(false);

//             const {
//               EMP,
//               DES,
//               CGC,
//               EDR,
//               BAI,
//               CID,
//               TEL,
//               LOG,
//               PWD,
//               INI,
//               FIM,
//               MAT,
//               EMI,
//               VER,
//               CTR,
//               PRP
//             } = response.data.decoded;


//             setEmpresa(EMP || "");
//             setRazao(DES || "");
//             setCNPJ(CGC || "");
//             setEndereco(EDR || "");
//             setBairro(BAI || "");
//             setCidade(CID || "");
//             setTelefone(TEL || "");
//             setEmail(LOG || "");
//             setSenha(PWD || "");
//             setTipoPlano(MAT || "");
//             setMesMovimentoInicial(INI)
//             setMesMovimentoFinal(FIM);
//             setEmissao(EMI);
//             setVersao(VER);
//             setContrato(CTR);
//             setProprietario(PRP);

//           } else {
//             setError("Token inválido ou expirado.");
//             setLoading(false);
//           }
//         } catch (error) {
//           setError(<MessageError />);
//           setLoading(false);
//         }
//       };
//       verifyToken();
//     }

//     fetchAndProcessTXT();


//   }, [token]);

//   // if (loading) return <p>Carregando...</p>
//   if (loading) return <LoadingSpinner />
//   if (error) return <p>{error}</p>

//   const formatCNPJ = (value: string): string => {
//     value = value.replace(/\D/g, "");
//     value = value.replace(/^(\d{2})(\d)/, "$1.$2");
//     value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
//     value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
//     value = value.replace(/(\d{4})(\d)/, "$1-$2");
//     return value;
//   };

//   const formatTEL = (value: string): string => {
//     value = value.replace(/\D/g, "");
//     value = value.replace(/^(\d{2})(\d)/, "($1) $2");

//     if (value.length >= 10) {
//       value = value.replace(/(\d{5})(\d{4})/, "$1-$2");
//     } else {
//       value = value.replace(/(\d{4})(\d{4})/, "$1-$2");
//     }
//     return value;
//   };

//   const handleCNPJChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCNPJ(formatCNPJ(e.target.value));
//   };

//   const handleTELChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setTelefone(formatTEL(e.target.value));
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);

//     // Reseta as datas para o mês atual (11/2024)
//     const mesAtual = new Date();
//     const mes = (mesAtual.getMonth() + 1).toString().padStart(2, '0');  // Formato MM
//     const ano = mesAtual.getFullYear().toString();  // Formato YYYY

//     setMesMovimentoInicial(`${mes}/${ano}`);  // Atualiza o mês de movimento inicial
//     setMesMovimentoFinal(`${mes}/${ano}`);  // Atualiza o mês de movimento final

//   };

//   const handleConfirm = () => {

//     if (!valorPago) {
//       toast.error("Por favor, calcule o valor do seu Plano.", { position: "top-right", autoClose: 3000 });
//       return;
//     }

//     if (tipoPlano) {
//     } else {
//       toast.error("Por favor, selecione um plano.", { position: "top-right", autoClose: 3000 });
//       return;
//     }
//     setIsLoading(true);
//     handleSubmit();
//     closeModal();


//   };

//   const handleOpenModal = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (senha !== confirmSenha) {
//       toast.error("As senhas não conferem!", { position: "top-right", autoClose: 3000 });
//     } else {
//       setIsModalOpen(true);
//     }
//   };

//   const handlePlanChange = (e: ChangeEvent<HTMLSelectElement>) => {

//     const plan = e.target.value;
//     setTipoPlano(plan);
//     // calcularValorPlano();

//     // Atualiza os dados do plano
//     if (plan === "05") {
//       setTotalFuncionarios("5 Funcionários");
//     } else if (plan === "10") {
//       setTotalFuncionarios("10 Funcionários");
//     } else if (plan === "20") {
//       setTotalFuncionarios("20 Funcionários");
//     } else if (plan === "40") {
//       setTotalFuncionarios("40 Funcionários");
//     } else if (plan === "80") {
//       setTotalFuncionarios("80 Funcionários");
//     } else {
//       setTotalFuncionarios("0");
//     }

//     // Calcular o valor do plano
//     calcularValorPlano();
//   };

//   const handleDateChange = (date: string, type: 'inicio' | 'final') => {
//     if (type === 'inicio') {
//       setMesMovimentoInicial(date);  // Atualiza o mês de movimento inicial
//     } else {
//       setMesMovimentoFinal(date);  // Atualiza o mês de movimento final
//     }
//   };

//   async function calcularValorPlano() {
//     const meses = calcularMeses(mesMovimentoInical, mesMovimentoFinal); // Calcula a diferença de meses

//     if (!meses) {
//       setValorPago(""); // Limpa o valor exibido se a quantidade de meses for inválida
//       return;
//     }

//     try {
//       // Obtém os dados do TXT
//       const dadosPlano = await fetchAndProcessTXT();

//       if (!dadosPlano) {
//         setValorPago(""); // Limpa o valor exibido em caso de erro
//         return;
//       }

//       const { valorBase, taxaFUN, taxaFAT } = dadosPlano;

//       let multiplicadorFuncionario = 1;
//       let valorFinal = valorBase;

//       // Define o multiplicador do plano com base no tipo
//       switch (tipoPlano) {
//         case "10":
//           multiplicadorFuncionario = taxaFUN;
//           break;
//         case "20":
//           multiplicadorFuncionario = taxaFUN ** 2;
//           break;
//         case "40":
//           multiplicadorFuncionario = taxaFUN ** 3;
//           break;
//         case "80":
//           multiplicadorFuncionario = taxaFUN ** 4;
//           break;
//         default:
//           multiplicadorFuncionario = 1;
//       }

//       // Calcula o valor total com as taxas
//       valorFinal *= multiplicadorFuncionario;
//       valorFinal *= meses === 1 ? 1 : taxaFAT ** (meses - 1);
//       valorFinal = parseFloat(valorFinal.toFixed(2)); // Arredonda para 1 casa decimal

//       // Atualiza o estado do valor calculado
//       setValorPago(`R$ ${valorFinal}`);
//       setExibirValorPago(true);
//     } catch (error: any) {
//       console.error("Erro ao calcular valor do plano:", error.message);
//       setValorPago(""); // Limpa o valor exibido em caso de erro
//     }
//   }



//   // Função para calcular a quantidade de meses entre as datas no formato MM/YYYY
//   const calcularMeses = (dataInicial: string, dataFinal: string): any => {

//     const [mesInicio, anoInicio] = dataInicial.split('/');
//     const [mesFim, anoFim] = dataFinal.split('/');

//     // Criando objetos Date usando o primeiro dia de cada mês
//     const inicio = new Date(parseInt(anoInicio), parseInt(mesInicio) - 1, 1);  // Mês começa em 0, então subtrai 1
//     const fim = new Date(parseInt(anoFim), parseInt(mesFim) - 1, 1);  // Mês começa em 0, então subtrai 1

//     // Verifica se a data inicial é maior que a final
//     if (inicio > fim) {
//       toast.error("Confira as datas de Referência!", { position: "top-right", autoClose: 3000 });
//       return;
//     }


//     // Calcula a diferença de meses entre as datas
//     const diferencaMeses = (fim.getFullYear() - inicio.getFullYear()) * 12 + (fim.getMonth() - inicio.getMonth());
//     let diferencaMesesMaisUm = diferencaMeses + 1;

//     return diferencaMesesMaisUm;
//   };



//   const handleSubmit = async () => {

//     const mesesMovimento = calcularMeses(mesMovimentoInical, mesMovimentoFinal);  // Calcula a quantidade de meses

//     console.log(mesesMovimento);
//     if (!mesesMovimento) {
//       return;
//     }

//     let cnpj = CNPJ.replace(/[^\d]/g, '');
//     let valorPagoFloat = parseFloat(valorPago.replace("R$", "").trim());

//     // Converter 'emissao' (string no formato xx/yy/zzzz) para um objeto Date
//     const emissaoParts = emissao.split("/"); // Divide a string 'emissao' em dia, mês e ano
//     const emissaoDate = new Date(
//       parseInt(emissaoParts[2]), // Ano
//       parseInt(emissaoParts[1]) - 1, // Mês (0-indexado em Date)
//       parseInt(emissaoParts[0]) // Dia
//     );

//     // Incrementar 3 dias
//     emissaoDate.setDate(emissaoDate.getDate() + 3);

//     // Formatar a nova data para o formato xx/yy/zzzz
//     const dataFormatada = `${String(emissaoDate.getDate()).padStart(2, "0")}/${String(emissaoDate.getMonth() + 1).padStart(2, "0")
//       }/${emissaoDate.getFullYear()}`;

//     // Atualizar a propriedade 'DAT' com a nova data
//     const data = {
//       EMP: empresa,
//       CGC: CNPJ,
//       DES: razao,
//       PRP: proprietario,
//       EDR: endereco,
//       BAI: bairro,
//       CID: cidade,
//       TEL: telefone,
//       LOG: email,
//       PWD: senha,
//       CTR: contrato,
//       INI: mesMovimentoInical,
//       FIM: mesMovimentoFinal,
//       MAT: tipoPlano,
//       EMI: emissao,
//       DAT: dataFormatada, // Nova data com 3 dias incrementados
//       VER: versao,
//       VAL: valorPagoFloat,
//       NOM: proprietario
//     };

//     console.log(data);
//     // Inclui mesMovimento no envio de dados
//     try {

//       const response = await fetch("http://144.217.248.124:3200/confirmarPlano", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });


//       const result = await response.json();

//       // console.log("Result: " + JSON.stringify(result));

//       if (result.success) {
//         toast.success(result.message, { position: "top-right", autoClose: 3000 });
//         // setTimeout(() => setResult(true), 1500);
//         setResult(true);
//       } else {
//         toast.error(result.message, { position: "top-right", autoClose: 3000 });
//       }


//     } catch (error) {
//       toast.error("Erro ao realizar a Requisição!", { position: "top-right", autoClose: 3000 });
//     } finally {
//       setIsLoading(false);
//       setIsModalOpen(false);
//     }
//   };

//   return (




//     <div className={styles.containerCenter}>

//       {isLoading && (
//         <div className={styles.loadingOverlay}>
//           {/* <h2 className={styles.loading}>Carregando...</h2> */}
//           <LoadingSpinner />
//         </div>
//       )}

//       {!isLoading && !result && (
//         <>
//           <Image className={styles.img} src={logoImg} alt="micromoney" />
//           <h2 className={styles.p}>Finalize seu Cadastro</h2>

//           <section className={styles.login}>
//             <form className={styles.loginForm} onSubmit={handleOpenModal}>
//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>Empresa </label>
//                 <input
//                   type="text"
//                   required
//                   name="emp"
//                   placeholder="Digite o Nome da Empresa"
//                   className={styles.input2}
//                   value={empresa}
//                   onChange={(e) => setEmpresa(e.target.value)}
//                   disabled
//                 />
//               </div>


//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>CNPJ </label>
//                 <input
//                   type="text"
//                   name="cgc"
//                   placeholder="Digite o CNPJ da Empresa"
//                   maxLength={18}
//                   className={styles.input2}
//                   value={CNPJ}
//                   onChange={handleCNPJChange}
//                   disabled
//                 />
//               </div>

//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>Nome / Razão Social</label>
//                 <input
//                   type="text"
//                   required
//                   name="des"
//                   placeholder="Digite o Nome da Empresa"
//                   className={styles.input2}
//                   value={razao}
//                   onChange={(e) => setRazao(e.target.value)}
//                   disabled
//                 />
//               </div>

//               <div className={styles.fieldGroup}>
//                 {/* <label className={styles.label}>Endereço </label>
//                 <input
//                   type="text"
//                   name="edr"
//                   placeholder="Digite o endereço da Empresa"
//                   className={styles.input}
//                   value={endereco}
//                   onChange={(e) => setEndereco(e.target.value)}
//                   required
//                 /> */}
//               </div>

//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>Endereço </label>
//                 <input
//                   type="text"
//                   name="edr"
//                   placeholder="Digite o endereço da Empresa"
//                   className={styles.input}
//                   value={endereco}
//                   onChange={(e) => setEndereco(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>Bairro </label>
//                 <input
//                   type="text"
//                   name="bai"
//                   placeholder="Digite o bairro da Empresa"
//                   className={styles.input}
//                   value={bairro}
//                   onChange={(e) => setBairro(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>Cidade </label>
//                 <input
//                   type="text"
//                   name="cid"
//                   placeholder="Digite a cidade da Empresa"
//                   className={styles.input}
//                   value={cidade}
//                   onChange={(e) => setCidade(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>Telefone </label>
//                 <input
//                   type="text"
//                   name="tel"
//                   placeholder="Digite um Telefone para Contato"
//                   maxLength={15}
//                   className={styles.input}
//                   value={telefone}
//                   onChange={handleTELChange}
//                   required
//                 />
//               </div>

//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>Email </label>
//                 <input
//                   type="email"
//                   required
//                   name="email"
//                   placeholder="Digite o Email"
//                   className={styles.input}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className={styles.fieldGroup}>
//                 <label className={styles.label}>Proprietário </label>
//                 <input
//                   type="text"
//                   required
//                   name="NOM"
//                   placeholder="Informe o nome do titular do plano"
//                   className={styles.input}
//                   value={proprietario}
//                   onChange={(e) => setProprietario(e.target.value)}
//                 />
//               </div>

//               <div className={styles.fieldGroup}></div>

//               <div className={styles.fieldGroup}>
//                 {/* <label className={styles.label}>Senha Novamente </label> */}

//                 <InputPassword
//                   label="Sua Senha"
//                   name="senha"
//                   placeholder="Digite a Senha"
//                   value={senha}
//                   onChange={(e) => setSenha(e.target.value)}
//                 />

//               </div>

//               <div className={styles.fieldGroup}>
//                 <InputPassword
//                   label="Senha Novamente"
//                   name="confirmSenha"
//                   placeholder="Digite a Senha Novamente"
//                   value={confirmSenha}
//                   onChange={(e) => setConfirmSenha(e.target.value)}
//                 />
//               </div>



//               <button className={styles.button} type="submit">
//                 Avançar
//               </button>
//             </form>
//           </section>



//           <Modal
//             isOpen={isModalOpen}
//             onRequestClose={() => setIsModalOpen(false)}
//             className={styles.modalContent}
//             overlayClassName={styles.modalOverlay}
//           >
//             <h2 className={styles.h2}>Confirme seu Plano</h2>

//             <div className={styles.selectContainer}>
//               <div className={styles.dataContainer}>
//                 <div className={styles.labelContainer}>
//                   <label className={styles.label}>Mês de Movimento Inicial </label>
//                   <InputDate
//                     initialValue={mesMovimentoInical}
//                     onDateChange={(date) => handleDateChange(date, 'inicio')}
//                   />
//                 </div>

//                 <div className={styles.labelContainer}>
//                   <label className={styles.label}>Mês de Movimento Final </label>
//                   <InputDate
//                     initialValue={mesMovimentoFinal}
//                     onDateChange={(date) => handleDateChange(date, 'final')}
//                   />
//                 </div>
//               </div>

//               <label htmlFor="planSelect" className={styles.label}>Quantidade de Funcionários</label>
//               <div className={styles.calcContainer}>
//                 <select
//                   id="planSelect"
//                   className={styles.select}
//                   value={tipoPlano}
//                   onChange={handlePlanChange}
//                   required
//                 >
//                   <option value="00" defaultChecked>Selecione</option>
//                   <option value="05">5 Funcionários</option>
//                   <option value="10">10 Funcionários</option>
//                   <option value="20">20 Funcionários</option>
//                   <option value="40">40 Funcionários</option>
//                   <option value="80">80 Funcionários</option>
//                 </select>

//                 <button className={styles.calcButton} onClick={calcularValorPlano}>
//                   Calcular Valor
//                 </button>
//               </div>


//               <div
//                 className="valorApagar-container"
//                 style={{ display: exibirValorPago ? 'block' : 'none', flexDirection: "column" }} // Controla a visibilidade
//               >
//                 <label className={styles.label}>
//                   Valor a Ser Pago
//                 </label><br />

//                 <input
//                   type="text"
//                   value={valorPago}
//                   disabled
//                   className={styles.input2}
//                 />
//               </div>

//             </div>

//             <button className={styles.confirmButton} onClick={handleConfirm}>
//               Confirmar Plano
//             </button>
//           </Modal>

//         </>
//       )}

//       {result && (
//         <div className={styles.resultContainer}>
//           <CheckEmail />
//         </div>
//       )}

//       <ToastContainer />
//     </div>



//   );
// }


