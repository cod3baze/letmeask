import { useNavigate } from "react-router-dom";

import googleIconImg from "../assets/google-icon.svg";
import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { auth, Firebase } from "../services/firebase";

import "../styles/auth.scss";

export function Home() {
  const history = useNavigate();

  function handleCreateRoom() {
    const provider = new Firebase.auth.GoogleAuthProvider();

    try {
      auth.signInWithPopup(provider).then((result) => {
        console.log(result);

        history("/rooms/new");
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

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
          <button
            onClick={handleCreateRoom}
            className="create-room"
            type="button"
          >
            <img draggable={false} src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma outra sala</div>
          <form>
            <input placeholder="Digite o código da sala" type="text" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
