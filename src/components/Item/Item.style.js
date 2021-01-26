import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 50%;
  img {
    width: 80%;
  }
  button {
    width: 70px;
    height: 70px;
  }
`;

export const UpButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
`;

export const DownButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
`;
