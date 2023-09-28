/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { css } from "@emotion/react";
import { Container, Title, Data, Favorite } from "./detailCard.style";
import FavIcon from "../../assets/favorite-icon.svg";

interface detailCardProps {
  first_name: string;
  id?: number;
  last_name: string;
  phones: {
    number: string;
  }[];
}

const DetailCard = (props: detailCardProps) => {
  return (
    <div>
      <Container>
        <Title>First Name</Title>
        <Data>{props.first_name}</Data>
      </Container>
      <Container>
        <Title>Last Name</Title>
        <Data>{props.last_name}</Data>
      </Container>
      <Container>
        <Title>Phone Number</Title>
        {props.phones.map((val, idx) => (
          <Data key={idx}>{val.number}</Data>
        ))}
      </Container>
      <Container>
        <Favorite>
          <Title>Favorite</Title>
          <div
            css={css`
              cursor: pointer;
              height: 24px;
              width: 24px;
            `}
          >
            <img alt="fav" src={FavIcon} />
          </div>
        </Favorite>
      </Container>
    </div>
  );
};

export default DetailCard;
