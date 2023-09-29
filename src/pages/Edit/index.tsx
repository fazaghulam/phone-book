/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useMutation, useSuspenseQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { BtnContainer, Container, Name, NavText, StyledLink } from "./edit.style";
import Button from "../../components/button";
import Profilpic from "../../components/profilpic";
import InputCard from "../../components/inputCard";
import ChevronLeft from "../../assets/chevron-left-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";

type Params = {
  id: string;
};

interface Phone {
  number: string;
}

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phones?: Phone[];
}
interface ContactByPk {
  contact_by_pk: Contact;
}

const GET_CONTACT_BY_PK = gql`
  query getContactByPK($id: Int!) {
    contact_by_pk(id: $id) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

const EDIT_CONTACT_BY_PK = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

const EDIT_PHONES_BY_PK = gql`
  mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number: String!) {
    update_phone_by_pk(pk_columns: $pk_columns, _set: { number: $new_phone_number }) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();

  const { data } = useSuspenseQuery<ContactByPk>(GET_CONTACT_BY_PK, {
    variables: { id: id },
  });
  const contact: Contact = data.contact_by_pk;
  const [editContact] = useMutation(EDIT_CONTACT_BY_PK);
  const [editPhone] = useMutation(EDIT_PHONES_BY_PK);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [inputFields, setInputFields] = useState<{ id: number; number: string }[]>();
  const oldPhoneNumbers = contact.phones?.map((phone) => phone.number) || [];

  useEffect(() => {
    if (data) {
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setInputFields(
        contact.phones
          ? contact.phones.map((phone, index) => ({ id: index, number: phone.number }))
          : [{ id: 0, number: "" }]
      );
    }
  }, [data]);

  const handleInputChange = (id: number, value: string) => {
    const updatedInputFields = inputFields?.map((field) => (field.id == id ? { ...field, number: value } : field));
    setInputFields(updatedInputFields);
  };

  const handleSave = async () => {
    try {
      for (let i = 0; i < inputFields?.length!; i++) {
        const phone = inputFields![i];
        const oldPhoneNumber = oldPhoneNumbers[i];

        if (phone.number !== oldPhoneNumber) {
          await editPhone({
            variables: {
              pk_columns: {
                number: oldPhoneNumber,
                contact_id: contact.id,
              },
              new_phone_number: phone.number,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error saving phone numbers", error);
    }
  };

  const handleUpdateContact = async () => {
    try {
      await editContact({
        variables: {
          id: contact.id,
          _set: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      handleSave();
      navigate("/");
    } catch (e) {
      console.error("Error update Contact", e);
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
      <div>
        <InputCard
          placeHolder="First Name"
          value={data?.contact_by_pk.first_name}
          textInputChange={(e: string) => setFirstName(e)}
        />
        <InputCard
          placeHolder="Last Name"
          value={data?.contact_by_pk.last_name}
          textInputChange={(e: string) => setLastName(e)}
        />
        {inputFields?.map((input, idx) => (
          <InputCard
            key={idx}
            placeHolder="08xxx"
            value={input.number}
            textInputChange={(e: string) => handleInputChange(input.id, e)}
          />
        ))}
      </div>
      <BtnContainer>
        <Button type="save" label="Save" onClick={handleUpdateContact} icon={<img alt="save" src={EditIcon} />} />
      </BtnContainer>
    </Container>
  );
};

export default Edit;
