import { css } from "@emotion/react";

type styleProps = {
  bgtype: string;
};

export const styles = (props: styleProps) => css`
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 10px;
  display: flex;
  font-size: 13px;
  font-weight: 600;
  line-height: 13px;
  color: white;
  padding-left: 28px;
  padding-right: 28px;
  padding-top: 10px;
  padding-bottom: 10px;
  ${props.bgtype === "add"
    ? `background-color: #2031BD; &:hover { background-color: #6473F4;}`
    : props.bgtype === "edit"
    ? `background-color: #0065D2; &:hover { background-color: #4EA3FF;}`
    : props.bgtype === "save"
    ? `background-color: #0065D2; &:hover { background-color: #4EA3FF;}`
    : props.bgtype === "delete"
    ? `background-color: #FF3346; &:hover { background-color: #F39099;}`
    : ``}
`;
