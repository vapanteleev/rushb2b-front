import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SupplierPage.css';
import { useNavigate } from 'react-router-dom';

const SupplierPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event: any) => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role: 'supplier',
        username: "supplier - " + email
      }),
    });

    if (response.ok) {
      alert('Registration successful');
    } else {
      alert('Registration failed');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="registration-container"
    >
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
        className="registration-form"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="back-button"
          onClick={handleBack}
        >
          Назад
        </motion.button>
        <h2>Supplier Registration</h2>
        <form onSubmit={handleRegister}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="form-group"
          >
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="form-group"
          >
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="submit-button"
          >
            Register
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SupplierPage;
