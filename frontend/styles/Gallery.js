import styled from "styled-components";

export const Gallery = styled.section`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  padding-bottom: 40px;

  h3 {
    color: black;
  }
`;
