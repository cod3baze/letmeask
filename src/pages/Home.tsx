import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import googleIconImg from "../assets/google-icon.svg";
import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuthProvider } from "../contexts/auth";
import { database } from "../services/firebase";

import "../styles/auth.scss";

export function Home() {
  const [roomCode, setRoomCode] = useState("");

  const history = useNavigate();

  const { user, signInWithGoogle } = useAuthProvider();

  async function handleCreateRoom() {
    try {
      if (!user.id) {
        await signInWithGoogle();
      }

      history("/rooms/new");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (roomRef.exists()) {
      history(`/rooms/${roomCode}`);
      return;
    }

    toast.error("Room does not exists");
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
          <form onSubmit={handleJoinRoom}>
            <input
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              id="room-code"
              placeholder="Digite o código da sala"
              type="text"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
