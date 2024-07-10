// LoginPage.js

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginForm = styled.form`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  position: relative;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const FormLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password });
      console.log(response.data); // Обработка успешного входа
      if (response?.data) {
        navigate(`/buyer/${response?.data?.userId}`);

      }
    } catch (error: any) {
      console.error(error.response.data); // Обработка ошибок
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSubmit}>
        <BackButton onClick={handleBackClick}>Назад</BackButton>
        <FormTitle>Вход</FormTitle>
        <FormInput
          type="text"
          placeholder="Имя пользователя или Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormButton type="submit">Войти</FormButton>
        <FormLink href="#">Забыли пароль?</FormLink>
        <FormLink href="#">Создать новый аккаунт</FormLink>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default LoginPage;
