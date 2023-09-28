/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { styles } from "./button.style";

type buttonProps = {
  type: "add" | "delete" | "edit";
  label: string;
  icon?: JSX.Element;
};
const Button = (props: buttonProps) => {
  return (
    <button css={styles({ bgtype: props.type })}>
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
