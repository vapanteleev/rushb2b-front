import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SupplierPage.css'
import Select from 'react-select'
import countryList from 'react-select-country-list'

const productOptions = [
  { value: 'Металлургия', label: 'Металлургия' },
  { value: 'Электроника', label: 'Электроника' },
  { value: 'Машиностроение', label: 'Машиностроение' },
  // Добавьте другие виды товаров
];

const SupplierRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [country, setCountry] = useState('');

  const countries = countryList().getData();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4000/api/register', {
        email,
        password,
        role: 'supplier',
        username,
        phoneNumber,
        productTypes: productTypes.map(p => p.value),
        country,
      }).then((response:any)=>{
        navigate(`/supplier-profile/${response?.data?.user?._id}`);

      });

    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="supplier-registration">
      <h2>Регистрация поставщика</h2>
      <form onSubmit={handleRegister}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Пароль:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Имя пользователя:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Номер телефона:
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </label>
        <label>
          Виды товаров:
          <Select
            options={productOptions}
            isMulti
            value={productTypes}
            onChange={setProductTypes as any}
          />
        </label>
        <label>
          Страна:
          <Select
            options={countries}
            value={countries.find(c => c.value === country)}
            onChange={(e) => setCountry(e?.value || '')}
          />
        </label>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default SupplierRegistration;
