/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Box, Input } from "./searchBar.style";
import SearchIcon from "../../assets/search-icon.svg";
import { useState } from "react";

type searchBarProps = {
  text?: string;
  onSearchChange: (value: string) => void;
};

const SearchBar = (props: searchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchValue(newValue);
    props.onSearchChange(newValue);
  };

  return (
    <Box>
      <img alt="search" src={SearchIcon} />
      <Input
        type="text"
        id="search"
        name="search"
        placeholder="search contact..."
        value={searchValue}
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchBar;
