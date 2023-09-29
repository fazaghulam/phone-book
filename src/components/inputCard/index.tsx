/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Input } from "./inputCard.style";
import { useState } from "react";

interface inputCardProps {
  placeHolder: string;
  textInputChange: (value: string) => void;
}

const InputCard = (props: inputCardProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    props.textInputChange(newValue);
  };

  return (
    <div>
      <Input type="text" id="input" placeholder={props.placeHolder} value={inputValue} onChange={handleInputChange} />
    </div>
  );
};

export default InputCard;
