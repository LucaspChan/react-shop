import styled from "styled-components";

export const DetailsStyles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  img {
    width: 40%;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 1rem 0 4rem 0;
    img {
      width: 100%;
    }
  }
`;

export const ProductInfo = styled.div`
  width: 40%;
  button {
    font-size: 1rem;
    font-weight: medium;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  section {
    display: flex;
    justify-content: space-between;
  }
  h3 {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
  button {
    background: transparent;
    border: none;
    display: flex;
    font-size: 1.5rem;
    padding: 0rem 0.5rem;
  }
  p {
    width: 1rem;
    text-align: center;
  }
  span {
    color: var(--secondary);
  }
  svg {
    color: #494949;
  }
`;

export const Buy = styled.button`
  width: 100%;
  background: var(--primary);
  color: white;
  font-weight: 500;
`;
