/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { useParams } from "react-router-dom";
import { jsx } from "@emotion/react";
import { css } from "@emotion/react";
import { useQuery, gql } from "@apollo/client";
import { Container, Name, NavText, BtnContainer, StyledLink } from "./detail.style";
import ChevronLeft from "../../assets/chevron-left-icon.svg";
import Profilpic from "../../components/profilpic";
import DetailCard from "../../components/detailCard";
import Button from "../../components/button";
import EditIcon from "../../assets/edit-icon.svg";
import DeleteIcon from "../../assets/delete-icon.svg";

type Params = {
  id: string;
};

interface Contact {
  first_name: string;
  id: number;
  last_name: string;
  phones: {
    number: string;
  }[];
}

interface ContactData {
  contact_by_pk: Contact;
}

const GET_DETAIL = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      phones {
        number
      }
    }
  }
`;

const Detail: React.FC = () => {
  const { id } = useParams<Params>();
  const { data, loading, error } = useQuery<ContactData>(GET_DETAIL, { variables: { id: id } });
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <div
        css={css`
          display: flex;
          width: fit-content;
          cursor: pointer;
          margin-bottom: 38px;
        `}
      >
        <img alt="back" src={ChevronLeft} />
        <StyledLink to="/">
          <NavText>All Contacts</NavText>
        </StyledLink>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin: 0 35px;
        `}
      >
        <Profilpic size={110} />
      </div>
      <Name>
        {data?.contact_by_pk.first_name} {data?.contact_by_pk.last_name}
      </Name>
      <DetailCard title="First Name" value={data?.contact_by_pk.first_name!} />
      <DetailCard title="Last Name" value={data?.contact_by_pk.last_name!} />
      <DetailCard title="Phone Number" phone={data?.contact_by_pk.phones!} />
      <BtnContainer>
        <Button type="edit" label="Edit" icon={<img alt="edit" src={EditIcon} />} />
        <Button type="delete" label="Delete" icon={<img alt="del" src={DeleteIcon} />} />
      </BtnContainer>
    </Container>
  );
};

export default Detail;
