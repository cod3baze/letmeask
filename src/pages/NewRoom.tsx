import { Link } from "react-router-dom";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";

import "../styles/auth.scss";

const NewRoom = () => {
  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="ilustração simbolizando perguntas e respostas"
          draggable={false}
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real!</p>
      </aside>

      <main>
        <div className="main-content">
          <img draggable={false} src={logoImg} alt="letmeask" />
          <h2>Criar uma nova sala</h2>
          <div className="separator">ou entre em uma outra sala</div>
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
};

export { NewRoom };
