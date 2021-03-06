/* eslint-disable no-alert */
import { useParams, useNavigate } from "react-router-dom";

import deleteImg from "../assets/delete.svg";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import "../styles/room.scss";

type RoomRouteParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomRouteParams>();
  const roomId = params?.id as string;
  const history = useNavigate();

  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history("/");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />

          <div>
            <RoomCode code={roomId} />
            <Button isOutlined type="button" onClick={() => handleEndRoom()}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        <div className="question-list">
          {questions?.map((question) => (
            <Question key={question.id} data={question}>
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remove question" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
