import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  padding: 28px;
`;

export const Name = styled.p`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 110% */
  text-align: center;
  margin-bottom: 35px;
`;

export const NavText = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
`;

export const BtnContainer = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;
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
