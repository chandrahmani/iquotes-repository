import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) =>
    props.primary
      ? "#0d6efd"
      : props.secondary
      ? "#6c757d"
      : props.danger
      ? "#dc3545"
      : "black"};

  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  border: 0;
`;

export const Wrapper = styled.div`
  background-color: #e3e3e3;
  max-width: 800px;
  margin: auto;
  border-radius: 5px;
  margin-top: 1rem;
  padding: 1rem;
`;

export const Title = styled.h3`
  font-size: ${({ size }) => {
    if (size === "large") {
      return "40px";
    }
    if (size === "medium") {
      return "30px";
    }
    if (size === "small") {
      return "20px";
    } else {
      return "20px";
    }
  }};

  text-align: center;
  margin-top: 1rem;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1a88e3;
  padding: 20px;
`;

export const Paragraph = styled.p`
  color: red;
  font-weight: 500;
  margin-top: 0.1rem;
`;

export const Main = styled.div`
  background-color: hwb(120deg 87% 10%);
  margin-top: 1rem;
  border-radius: 4px;
  padding: 2rem;
`;

export const Navbar = styled.div`
  background-color: #a2a2a26e;
  height: 10vh;
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: row;
`;

export const Lists = styled.li`
  padding: 1rem;
`;

export const ListGroup = styled.div`
  border: 1px solid;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #ced4da;
  padding: ${(props) => props.size};
  margin: ${(props) => props.size};
`;

export const Div = styled.div`
  margin: ${(props) => props.size};
`;
