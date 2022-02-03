import "./styles.scss";

type QuestionData = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
};

interface IQuestionProps {
  data: QuestionData;
}

export function Question({ data: { content, author } }: IQuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div />
      </footer>
    </div>
  );
}
