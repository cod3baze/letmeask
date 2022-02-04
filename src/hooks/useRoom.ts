/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { useAuthProvider } from "../contexts/auth";
import { database } from "../services/firebase";

type QuestionType = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likes: Record<
    string,
    {
      authorId: string;
    }
  >;
};

type IQuestion = Omit<QuestionType, "likes"> & {
  likeId: string | undefined;
};

type FirebaseQuestions = Record<string, QuestionType>;

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [title, setTitle] = useState<string>("");

  const { user } = useAuthProvider();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([_, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);

      return () => roomRef.off("value");
    });
  }, [roomId, user?.id]);

  return { questions, title };
}
