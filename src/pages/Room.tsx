import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuthProvider } from "../contexts/auth";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import "../styles/room.scss";

type RoomRouteParams = {
  id: string;
};

export function Room() {
  const [newQuestion, setNewQuestion] = useState("");

  const { user, signInWithGoogle } = useAuthProvider();

  const params = useParams<RoomRouteParams>();
  const roomId = params?.id as string;

  const { questions, title } = useRoom(roomId);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      toast.error("Preencha a questão.", {
        duration: 1500,
      });
      return;
    }
    if (!user.id) {
      toast.error("You must be logged in");
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question, (error) => {
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Question created!");
      setNewQuestion("");
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />

          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="O que você quer perguntar?"
          />

          <div className="form-footer">
            {user.id ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} draggable={false} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{" "}
                <button onClick={signInWithGoogle} type="button">
                  faça o login
                </button>
              </span>
            )}

            <Button type="submit" disabled={!user.id}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions?.map((question) => (
            <Question key={question.id} data={question} />
          ))}
        </div>
      </main>
    </div>
  );
}
