import "../styles/room-code.scss";

import copyImg from "../assets/copy.svg";

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code).then(() => {
      alert("Código copiado!");
    });
  }

  return (
    <button onClick={copyRoomCodeToClipboard} id="room-code-btn" type="button">
      <div>
        <img src={copyImg} alt="copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
