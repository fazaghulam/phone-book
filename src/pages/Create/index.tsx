/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";
import { Container, StyledLink, NavText, BtnContainer, Name } from "./create.style";
import Profilpic from "../../components/profilpic";
import ChevronLeft from "../../assets/chevron-left-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import Button from "../../components/button";
import InputCard from "../../components/inputCard";

interface data {
  first_name: string;
  id: number;
  last_name: string;
  phones: {
    number: string;
  }[];
}

interface ContactData {
  contact: data[];
}

const ADD_CONTACT = gql`
  mutation AddContactWithPhones($first_name: String!, $last_name: String!, $phones: [phone_insert_input!]!) {
    insert_contact(objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

const GET_CONTACT = gql`
  query GetContactList {
    contact {
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

const Create: React.FC = () => {
  const navigate = useNavigate();

  const { data } = useQuery<ContactData>(GET_CONTACT);
  const [addContact] = useMutation(ADD_CONTACT);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleFirstName = (value: string) => {
    setFirstName(value);
  };
  const handleLastName = (value: string) => {
    setLastName(value);
  };
  const handlePhoneNumber = (value: string) => {
    setPhoneNumber(value);
  };

  const isValidName = (name: string) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  const handleSave = async () => {
    try {
      if (!isValidName(firstName) || !isValidName(lastName)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "First name and last name should only contain letters and spaces",
        });
        return;
      }
      const isDuplicate = data?.contact.some(
        (contact) =>
          contact.first_name.toLowerCase() === firstName.toLowerCase() ||
          contact.phones.some((phone) => phone.number === phoneNumber)
      );

      if (isDuplicate) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Contact with the same first name or phone number already exists",
        });
        return;
      }

      await addContact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones: [{ number: phoneNumber }],
        },
      });
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New contact has been created",
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Try again",
        timer: 1500,
      });
    }
  };

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
        {firstName} {lastName}
      </Name>
      <div
        css={css`
          display: grid;
        `}
      >
        <InputCard placeHolder="First Name" textInputChange={handleFirstName} />
        <InputCard placeHolder="Last Name" textInputChange={handleLastName} />
        <InputCard placeHolder="08xxx" textInputChange={handlePhoneNumber} />
      </div>
      <BtnContainer>
        <Button type="save" label="Save" onClick={handleSave} icon={<img alt="save" src={EditIcon} />} />
      </BtnContainer>
    </Container>
  );
};

export default Create;
