import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid black
  list-style: none;
  padding-left: 0
`;

export const Item = styled.li`
  border: 1px solid black;
  padding: 6px;
  border-radius: 8px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
`;

export const Button = styled.button`
  padding: 2px 8px;
  font: inherit;
  cursor: pointer;
  border-radius: 8px 8px;
  border: 1px solid black;

  &:hover,
  &:focus {
    color: green;
    background-color: #fba003;
    cursor: pointer;
  }
`;
