import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface Activity {
  code: string;
  name: string;
}

interface User {
  email: string;
  role: string;
  activities: Activity[];
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  animation: ${fadeIn} 1s ease-out;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #555;
  margin-top: 1rem;
  animation: ${fadeIn} 1.2s ease-out;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  animation: ${fadeIn} 1.4s ease-out;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #777;
  margin-top: 0.5rem;
`;

const SearchContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
  animation: ${fadeIn} 1.6s ease-out;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const RecommendedProducts = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
  animation: ${fadeIn} 1.8s ease-out;
`;

const BuyerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <Container>
      {user ? (
        <>
          <Title>Welcome, {user.email}</Title>
          <Subtitle>Role: {user.role}</Subtitle>
          <Subtitle>Activities:</Subtitle>
          <List>
            {user.activities.map(activity => (
              <ListItem key={activity.code}>{activity.name}</ListItem>
            ))}
          </List>
          <SearchContainer>
            <Subtitle>Search Products</Subtitle>
            <Input type="text" placeholder="Search..." />
            <Button>Search</Button>
          </SearchContainer>
          <RecommendedProducts>
            <Subtitle>Recommended Products</Subtitle>
            {/* Add recommended products logic here */}
          </RecommendedProducts>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default BuyerPage;
