import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './BuyerRegistration.css';
import Select from 'react-select';
import { ApiService } from '../../../../Api/ApiService'
import * as ApiTypes from '../../../../Api/ApiTypes'

interface Props { }

const BuyerRegistration: React.FC<Props> = () => {
  const navigate = useNavigate();

  const [username, setusername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const activitiesOptionsMock: { value: string; label: string }[] = [
    { value: 'Металлургия', label: 'Металлургия' },
    { value: 'Горнодобыча', label: 'Горнодобыча' },
    { value: 'Химическая промышленность', label: 'Химическая промышленность' },
    { value: 'Нефтегазовая промышленность', label: 'Нефтегазовая промышленность' },
    { value: 'Машиностроение', label: 'Машиностроение' },
    // Добавьте другие тематики тяжелой промышленности
  ];
  const [activitiesOptions, setActivitiesOptions] = useState<any[]>([...activitiesOptionsMock]);


  const [activities, setActivities] = useState<any>([]);

  useEffect(() => {
    ApiService.GetActivities().then((activities: any) => {
      setActivitiesOptions(activities?.activities)

    })
  }, [])

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let mapedActivities = activities?.map((a: any) => {
      return {
        code: a.value,
        name: a.label
      }
    })
    const response = await fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role: 'buyer',
        companyName,
        country,
        activities: mapedActivities,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();

      alert('Registration successful');
      navigate(`/buyer/${responseData.user._id}`);

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
        <h2>Buyer Registration</h2>
        <form onSubmit={handleRegister}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="form-group"
          >
            <label>Имя пользователя:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </motion.div>
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
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="form-group"
          >
            <label>Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="form-group"
          >
            <label>Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="form-group"
          >
            <label>Род деятельности:</label>
            <Select
              options={activitiesOptions?.map((a: ApiTypes.Activity) => {
                return {
                  label: a.name,
                  value: a.code
                }
              })
              }
              isMulti
              value={activities}
              onChange={(selectedOptions: any) => {
                setActivities([...selectedOptions])
              }}
              className="multi-select"
              classNamePrefix="select"
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

export default BuyerRegistration
