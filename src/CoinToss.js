import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CoinToss.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CoinToss = () => {
  const [formData, setFormData] = useState({
    throw1: '',
    throw2: '',
    throw3: '',
    throw4: '',
    throw5: '',
    throw6: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch toss data when the component mounts
    fetchTossData();
  }, []);

  const fetchTossData = async () => {
    try {
      const res = await axios.get('http://localhost:8081/toss');
      // You can use the fetched data here if needed
    } catch (error) {
      console.error('Error fetching toss data:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const resetForm = () => {
    setFormData({
      throw1: '',
      throw2: '',
      throw3: '',
      throw4: '',
      throw5: '',
      throw6: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(Validation(formData));

    try {
      if (Object.keys(errors).length === 0) {
        const res = await axios.post('http://localhost:8081/toss', formData);
        if (res.status === 200) {
          setSuccessMessage('User created successfully');
          navigate('/Hexagram');
        } else {
          console.error('Unexpected response:', res);
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error.message);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== '');
  };

  return (
    <div>
      <button
        onClick={() => navigate('/QueryPage')}
        style={{
          backgroundColor: 'none',
          color: '#652C8F',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
        Back
      </button>
      <br />

      <div className="coin-container" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <br />
        <div style={{ marginBottom: '-60px' }}>
          <h2 style={{ fontSize: '30px', marginRight: '161px' }}>Coin Tossing</h2>
        </div>
        <br />
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.general && <p className="error-message">{errors.general}</p>}

        <br />
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="select-container" style={{ position: 'relative', marginBottom: '15px' }}>
            <label style={{ position: 'absolute', left: '10px', top: '0px', fontSize: '14px', backgroundColor: '#f0f0f0', padding: '0 5px', zIndex: '1', color: '#652C8F' }}>
              Throw {index}
            </label>
            <select
              name={`throw${index}`}
              value={formData[`throw${index}`]}
              onChange={handleChange}
              required
              
              style={{ width: '350px', height: '50px', padding: '10px', marginTop: '10px', borderColor: 'gray', backgroundColor: '#f0f0f0', fontFamily: 'Roboto, sans-serif' }}
            >
              <option value="" disabled hidden>Select an option</option>
              <option value="yin">Yin</option>
              <option value="yang">Yang</option>
              <option value="yin changing">Yin Changing</option>
              <option value="yang changing">Yang Changing</option>
            </select>
            {errors[`throw${index}`] && <span className="error-message">{errors[`throw${index}`]}</span>}
          </div>
        ))}

        <div className="button-container">
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              backgroundColor: isFormValid() ? '#652C8F' : '#ccc',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              width: '350px',
              height: '40px',
              marginTop: '20px',
              fontFamily: 'Roboto, sans-serif',
            }}
            disabled={!isFormValid()}
          >
            Generate Hexagram
          </button>

          <button
            type="button"
            onClick={resetForm}
            style={{
              backgroundColor: '#f0f0f0',
              color: '#652C8F',
              padding: '10px 20px',
              border: '2px solid black',
              borderRadius: '20px',
              cursor: 'pointer',
              width: '350px',
              height: '40px',
              marginTop: '20px',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Reset All
          </button>
        </div>

        <br />
        <br />
      </div>
    </div>
  );
};

function Validation(values) {
  let errors = {};

  if (!values.throw1) {
    errors.throw1 = ' ';
  }

  if (!values.throw2) {
    errors.throw2 = ' ';
  }
  if (!values.throw3) {
    errors.throw3 = ' ';
  }

  if (!values.throw4) {
    errors.throw4 = ' ';
  }

  if (!values.throw5) {
    errors.throw5 = ' ';
  }

  if (!values.throw6) {
    errors.throw6 = ' ';
  }

  return errors;
}

export default CoinToss;
