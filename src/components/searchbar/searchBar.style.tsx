import styled from "@emotion/styled";

export const Box = styled.div`
  border-radius: 20px;
  border: 1px solid #2031bd;
  background: #f8f8ff;
  padding: 4px 22px;
  display: flex;
  margin-right: 14px;
  flex: 1 1 0%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 6px 6px;
  background-color: transparent;
  border: 0px;
  &:focus {
    outline: none !important;
  }
`;
