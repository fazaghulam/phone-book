import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  padding: 28px 0;
`;

export const Header = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 22px; /* 100% */
  text-align: center;
`;

export const BtnAdd = styled.button`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  border: 0;
  background-color: #2031bd;
  padding: 0;
  color: white;
  font-size: 24px;
`;

export const SubHeader = styled.div`
  display: flex;
  margin-bottom: 4px;
  justify-content: space-between;
  background-color: #f8f8ff;
  padding: 8px 28px;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #000;
  }
`;
