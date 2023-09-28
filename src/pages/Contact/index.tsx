/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useQuery, gql } from "@apollo/client";
import ChevronUp from "../../assets/chevron-up-icon.svg";
import ChevronDown from "../../assets/chevron-down-icon.svg";
import ListCard from "../../components/listCard";
import { BtnAdd, Container, Header, SubHeader, StyledLink } from "./contact.style";
import SearchBar from "../../components/searchbar";

interface Contact {
  first_name: string;
  id: number;
  last_name: string;
  phones: {
    number: string;
  }[];
}

interface ContactData {
  contact: Contact[];
}

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

const Contact: React.FC = () => {
  const { data, loading, error } = useQuery<ContactData>(GET_CONTACT);
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const [favContactsVisible, setFavContactsVisible] = useState(true);
  const toggleFavContacts = () => {
    setFavContactsVisible(!favContactsVisible);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Adjust the number of items per page as needed

  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    e.preventDefault();

    if (selectedCards.length >= 5 && !selectedCards.includes(cardId)) {
      // You can show a message or notification here indicating the limit is reached.
      // For example, you can set a state to show a message to the user.
      // setErrorMsg("You can only have up to 10 favorite contacts.");
      return;
    } else {
      if (!selectedCards.includes(cardId)) {
        setSelectedCards([...selectedCards, cardId]);
        setFavContactsVisible(true);
      } else {
        const updatedCard = selectedCards.filter((_) => _ !== cardId);
        setSelectedCards(updatedCard);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredData = data?.contact.filter((contact) =>
    `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  const favoriteContacts = filteredData?.filter((contact) => selectedCards.includes(contact.id));
  const remainingContacts = filteredData?.filter((contact) => !selectedCards.includes(contact.id));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const paginatedContacts = remainingContacts?.slice(indexOfFirstContact, indexOfLastContact);

  return (
    <div>
      <Container>
        <Header>GOTO Phone Book</Header>
        <div
          css={css`
            display: flex;
            align-items: center;
            margin: 24px 28px 14px 28px;
          `}
        >
          <SearchBar onSearchChange={handleSearchChange} />
          <BtnAdd>+</BtnAdd>
        </div>
        <SubHeader onClick={toggleFavContacts}>
          Favorite
          <img alt="expand" src={favContactsVisible ? ChevronUp : ChevronDown} />
        </SubHeader>
        {favContactsVisible &&
          favoriteContacts?.map((val, idx) => (
            <StyledLink key={idx} to={`/contact/${val.id}`} style={{ textDecoration: "none" }}>
              <ListCard
                picSize={40}
                favorite={true}
                id={val.id}
                first_name={val.first_name}
                last_name={val.last_name}
                phones={val.phones}
                onFavoriteClick={(e) => handleCardClick(e, val.id)}
              />
            </StyledLink>
          ))}
        <SubHeader>All Contacts</SubHeader>
        {paginatedContacts?.map((val, idx) => (
          <StyledLink key={idx} to={`/contact/${val.id}`} style={{ textDecoration: "none" }}>
            <ListCard
              picSize={40}
              favorite={false}
              id={val.id}
              first_name={val.first_name}
              last_name={val.last_name}
              phones={val.phones}
              onFavoriteClick={(e) => handleCardClick(e, val.id)}
            />
          </StyledLink>
        ))}
        <div style={{ textAlign: "center" }}>
          <Pagination
            simple
            current={currentPage}
            total={remainingContacts?.length || 0}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </Container>
    </div>
  );
};

export default Contact;
