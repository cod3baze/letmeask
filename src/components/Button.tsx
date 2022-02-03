import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: IButtonProps) => {
  const { type } = props;

  return (
    <button className="button" {...props} type={type ? "submit" : "button"} />
  );
};

export { Button };
