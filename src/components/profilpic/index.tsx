/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { css } from "@emotion/react";
import profilIcon from "../../assets/profil-icon.svg";

type profilProps = {
  size: number;
};

const Profilpic = (props: profilProps) => {
  return (
    <div
      css={css`
        border-radius: 9999px;
        background-color: #dbeaf0;
        display: grid;
        place-content: center;
        width: ${props.size}px;
        height: ${props.size}px;
      `}
    >
      <img
        alt="profil"
        src={profilIcon}
        css={css`
          width: ${props.size / 1.5}px;
          height: ${props.size / 1.5}px;
        `}
      />
    </div>
  );
};

export default Profilpic;
