/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { css } from "@emotion/react";
import { Container, Name, Phone } from "./listCard.style";
import Profilpic from "../profilpic";

type listCardProps = {
  picSize: number;
  favorite: boolean;
  first_name: string;
  id: number;
  last_name: string;
  phones: {
    number: string;
  }[];
  onFavoriteClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};
const listCard = (props: listCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.onFavoriteClick(e);
  };

  return (
    <Container>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        `}
      >
        <Profilpic size={40} />
        <div>
          <Name>
            {props.first_name} {props.last_name}
          </Name>
          <Phone>{props.phones[0].number}</Phone>
        </div>
      </div>
      <div
        css={css`
          cursor: pointer;
          height: 24px;
          width: 24px;
        `}
        onClick={handleFavoriteClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.48 3.49897C11.5223 3.3958 11.5944 3.30755 11.6869 3.24543C11.7795 3.18331 11.8885 3.15015 12 3.15015C12.1115 3.15015 12.2205 3.18331 12.3131 3.24543C12.4057 3.30755 12.4777 3.3958 12.52 3.49897L14.645 8.60997C14.6848 8.70561 14.7502 8.78841 14.834 8.84928C14.9178 8.91015 15.0168 8.94672 15.12 8.95497L20.638 9.39697C21.137 9.43697 21.339 10.06 20.959 10.385L16.755 13.987C16.6765 14.0542 16.618 14.1417 16.5859 14.2399C16.5537 14.3382 16.5493 14.4434 16.573 14.544L17.858 19.929C17.8839 20.037 17.8771 20.1503 17.8386 20.2545C17.8001 20.3587 17.7315 20.4491 17.6417 20.5144C17.5518 20.5797 17.4446 20.6168 17.3336 20.6212C17.2226 20.6256 17.1128 20.597 17.018 20.539L12.293 17.654C12.2048 17.6002 12.1034 17.5717 12 17.5717C11.8967 17.5717 11.7953 17.6002 11.707 17.654L6.98203 20.54C6.88729 20.598 6.77748 20.6266 6.66649 20.6222C6.55549 20.6178 6.44828 20.5807 6.3584 20.5154C6.26851 20.4501 6.19999 20.3597 6.16148 20.2555C6.12297 20.1513 6.1162 20.038 6.14203 19.93L7.42703 14.544C7.45086 14.4434 7.44648 14.3381 7.41437 14.2399C7.38226 14.1416 7.32366 14.0541 7.24503 13.987L3.04103 10.385C2.95684 10.3126 2.89594 10.2169 2.86598 10.11C2.83602 10.0031 2.83834 9.88971 2.87264 9.78412C2.90695 9.67852 2.97172 9.58543 3.05879 9.51654C3.14587 9.44766 3.25137 9.40605 3.36203 9.39697L8.88003 8.95497C8.98328 8.94672 9.08225 8.91015 9.16606 8.84928C9.24986 8.78841 9.31525 8.70561 9.35503 8.60997L11.48 3.49897Z"
            fill={props.favorite ? "#FFC700" : "#D9D9D9"}
          />
        </svg>
      </div>
    </Container>
  );
};

export default listCard;
