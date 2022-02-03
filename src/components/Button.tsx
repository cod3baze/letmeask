import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

const Button = ({ isOutlined = false, ...rest }: IButtonProps) => {
  const { type } = rest;

  return (
    <button
      className={`button ${isOutlined ? "outlined" : ""}`}
      {...rest}
      type={type ? "submit" : "button"}
    />
  );
};

export { Button };
