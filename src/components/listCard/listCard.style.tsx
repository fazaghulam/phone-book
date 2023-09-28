import styled from "@emotion/styled";

export const Container = styled.div`
  height: 56px;
  padding-left: 28px;
  padding-right: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #f8f8ff;
  }
`;

export const Name = styled.p`
  font-size: 13px;
  line-height: 13px;
  font-weight: 600;
  margin: 0px;
  margin-left: 18px;
  margin-bottom: 4px;
`;

export const Phone = styled.p`
  font-size: 13px;
  line-height: 13px;
  font-weight: 300;
  color: #8c8c90;
  margin: 0px;
  margin-left: 18px;
`;
