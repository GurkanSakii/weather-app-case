import styled from "styled-components";

const History = ({ history, onSearch }) => {
  return (
    <HistoryContainer>
      <h3>Recent Searches</h3>
      <List>
        {history.map((city, index) => (
          <ListItem key={index} onClick={() => onSearch(city)}>
            {city}
          </ListItem>
        ))}
      </List>
    </HistoryContainer>
  );
};

export default History;

const HistoryContainer = styled.div`
  margin-top: 20px;
  text-transform: capitalize;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 500px;
`;

const ListItem = styled.li`
  cursor: pointer;
  padding: 8px;
  margin: 5px 0;
  background: #ddd;
  border-radius: 5px;

  &:hover {
    background: #fff;
  }
`;
