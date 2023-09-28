/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { styles } from "./button.style";

type buttonProps = {
  type: "add" | "delete" | "edit" | "save";
  label: string;
  icon?: JSX.Element;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = (props: buttonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onClick(e);
  };
  return (
    <button css={styles({ bgtype: props.type })} onClick={handleClick}>
      <div
        css={css`
          margin-right: 4px;
        `}
      >
        {props.icon}
      </div>
      <div>{props.label}</div>
    </button>
  );
};

export default Button;
