"use client"; //diz que deve rodar no navegador
import { useState } from "react"; //importa o hook que é usado pra armazenar valores que mudam enquanto o user interage (nome, email, senha)

import styles from "./registerPage.module.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // loading mostra "registrando..." enquanto processa.
  // message guarda a mensagem de sucesso ou erro

  const userSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // enviando dados para o back
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      /*
        -- fecth é usado pra fazer requisições HTTP, e usa o await pra esperar a resposta do sv.
        -- post: informa o sv que estamos enviando dados pra criar um novo user
        -- headers: informa ao sv que o corpo da requisicao esta em JSON
        -- body: converte os dados pra uma string antes de enviar */

      const data = await response.json();
      //armazena a resposta do servidor nessa variavel e usa o .json pra abrir esse objeto e transforma em objeto JS
      if (response.ok) {
        setMessage("Registro concluído com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
        /* o 'ok' é uma propriedade de um response que será true se a requisiçãop der certo. */
      } else {
        setMessage(data.message || "Erro no registro. Tente novamente.");
      }
      // aqui o data.message vai armazenar a mensagem retornada pelo backend
    } catch (error) {
      console.error("Erro de rede:", error);
      setMessage("Erro de conexão. Verifique o servidor.");
    } finally {
      setLoading(false);
    } //sempre executa independente de erro ou não
  };

  let buttonText;
  if (loading) {
    buttonText = "Registrando...";
  } else {
    buttonText = "Registrar";
  }

  let messageResult;
  let messageClass = styles.message;
  if (message.includes("sucesso")) messageClass += ' ' + styles.sucess;
  else messageClass += ' ' + styles.error;
  messageResult = (<p className={messageClass}>{message}</p>)
  //tem que ter o ' ' pro estilo aplicar corretamente 
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {/* div pra parte onde vai ficar sd informacoes*/}
        <h3 className={styles.title}>Registrar Conta</h3>
        <form onSubmit={userSubmit}>
          {/* form agrupa todos os campos de texto e dispara a funcao ao enviar*/}
          <div className={styles.formField}>
            <label className={styles.label} htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {/* o 'e' é o evento que tem todos os detalhes sobre a ação, o target aponta pro elemento que disparou o evento, nesse caso se refere ao input. quando eu pego o valor eu vou ter o que foi digitado no input */}
          </div>
          <div className={styles.formField}>
            <label className={styles.label} htmlFor="email">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="E-Mail"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formField}>
            <label className={styles.label} htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            {/* div pro botão */}
            <button
              type="submit"
              className={styles.button}
              disabled={
                loading
              } /*isso impede que o usuario clique varias vezes no botao enquando processa a requisição, quando ele é true o botao desabilitida, e quando false, habilita */
            >
              {buttonText}
            </button>
          </div>
          {messageResult}
        </form>
      </div>
    </div>
  );
}
