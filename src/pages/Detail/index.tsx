/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";
import { Container, Name, NavText, BtnContainer, StyledLink } from "./detail.style";
import Profilpic from "../../components/profilpic";
import DetailCard from "../../components/detailCard";
import Button from "../../components/button";
import ChevronLeft from "../../assets/chevron-left-icon.svg";
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

const DELETE_CONTACT = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();
  const { data, loading } = useQuery<ContactData>(GET_DETAIL, { variables: { id: id } });
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    variables: { id: id }, // Convert id to an integer
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Try again",
        timer: 1500,
      });
    },
    onCompleted: () => {
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your file has been deleted.",
        timer: 1500,
      });
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContact();
      }
    });
  };

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
        <Button type="edit" label="Edit" onClick={() => navigate(`/edit/${id}`)} icon={<img alt="edit" src={EditIcon} />} />
        <Button type="delete" label="Delete" onClick={handleDelete} icon={<img alt="del" src={DeleteIcon} />} />
      </BtnContainer>
    </Container>
  );
};

export default Detail;
