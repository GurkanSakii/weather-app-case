import { useState } from "react";
import styled from "styled-components";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Enter city name..." value={input} onChange={(e) => setInput(e.target.value)} />
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default SearchBar;

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  outline: none;

  &:focus {
    border-color: blue;
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;
