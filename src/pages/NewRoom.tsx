import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import illustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuthProvider } from "../contexts/auth";
import { database } from "../services/firebase";

import "../styles/auth.scss";

export function NewRoom() {
  const [room, setRoom] = useState("");
  const [creationIsLoading, setCreationIsLoading] = useState(false);

  const { user } = useAuthProvider();

  const history = useNavigate();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    setCreationIsLoading(true);

    if (room.trim() === "") return;

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push(
      {
        title: room,
        authorId: user?.id,
      },
      (error) => {
        if (error) {
          setCreationIsLoading(false);
        }
      }
    );

    history(`/rooms/${firebaseRoom.key}`);
  }

  useEffect(() => {
    return () => setCreationIsLoading(false);
  }, []);

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
          <form onSubmit={handleCreateRoom}>
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Nome da sala"
              type="text"
            />
            <Button type="submit">
              {creationIsLoading ? "loading..." : "Criar sala"}
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
