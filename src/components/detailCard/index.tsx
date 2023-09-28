/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Container, Title, Data } from "./detailCard.style";

interface detailCardProps {
  title: "First Name" | "Last Name" | "Phone Number";
  value?: string;
  phone?: {
    number: string;
  }[];
}

const DetailCard = (props: detailCardProps) => {
  return (
    <div>
      <Container>
        <Title>{props.title}</Title>
        {props.title === "First Name" || props.title === "Last Name" ? (
          <Data>{props.value}</Data>
        ) : (
          props.phone?.map((val, idx) => <Data key={idx}>{val.number}</Data>)
        )}
      </Container>
    </div>
  );
};

export default DetailCard;
