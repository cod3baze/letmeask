import { Link } from "react-router-dom";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
// import { useAuthProvider } from "../contexts/auth";

import "../styles/auth.scss";

export function NewRoom() {
  // const { user } = useAuthProvider();

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="ilustração simbolizando perguntas e respostas"
          draggable={false}
        />
        <strong> Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real!</p>
      </aside>

      <main>
        <div className="main-content">
          <img draggable={false} src={logoImg} alt="letmeask" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input placeholder="Nome da sala" type="text" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
