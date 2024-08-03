import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QueryPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputLabel, FormControl } from '@mui/material';
import { CalendarToday, AccessTime, ArrowBack } from '@mui/icons-material';

const QueryPage = () => {
  const [formData, setFormData] = useState({
    currentdate: new Date(),
    currenttime: '',
    questions: '',
    category: 'business',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(Validation(formData));
  }, [formData]);

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formValid) {
        const res = await axios.post('http://localhost:8081/query', formData);
        if (res.status === 200) {
          setSuccessMessage('Query submitted successfully');
          localStorage.setItem('queryData', JSON.stringify(formData));
          navigate('/CoinToss');
        } else {
          console.error('Unexpected response:', res);
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error.message);
    }
  };

  return (
    <div className="fixed-container" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <button
        onClick={() => navigate('/LandingPage')}
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
        <ArrowBack style={{ marginRight: '5px' }} />
        Back
      </button>
      <br />
      <div className="signup-container" style={{ marginTop: '-150px', fontFamily: 'Roboto, sans-serif' }}>
        <br />
        <h2 style={{ marginBottom: '5px', fontFamily: 'Roboto, sans-serif', fontSize: '30px', marginRight: '140px' }}>Query Details</h2>
        {successMessage && <p className="success-message" style={{ fontFamily: 'Roboto, sans-serif' }}>{successMessage}</p>}
        {errors.general && <p style={{ color: 'red', fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>{errors.general}</p>}

        <br />
        <FormControl className="input-container" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <InputLabel shrink style={{ fontSize: '21px', top: '0px', marginLeft: '-15px', fontFamily: 'Roboto, sans-serif' }}>Current Date</InputLabel>
          <div className="date-of-birth-container">
            <DatePicker
              selected={formData.currentdate}
              onChange={(date) => setFormData({ ...formData, currentdate: date })}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className="date-picker-input"
            />
            <CalendarToday className="calendar-icon" />
          </div>
          {errors.currentdate && <span style={{ color: 'red', fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>{errors.currentdate}</span>}
        </FormControl>

        <br />
        <FormControl className="input-container" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <InputLabel shrink style={{ fontSize: '21px', top: '0px', marginLeft: '-15px', fontFamily: 'Roboto, sans-serif' }}>Current Time</InputLabel>
          <div className="input-container">
            <input
              type="text"
              name="currenttime"
              value={formData.currenttime}
              onClick={() => {
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setFormData({ ...formData, currenttime: currentTime });
              }}
              required
              style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
            />
            <button
              className="time-picker-button"
              onClick={() => {
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setFormData({ ...formData, currenttime: currentTime });
              }}
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <AccessTime />
            </button>
          </div>
          {errors.currenttime && <span style={{ color: 'red', fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>{errors.currenttime}</span>}
        </FormControl>

        <br />
        <FormControl className="input-container" style={{ marginTop: '-20px', fontFamily: 'Roboto, sans-serif' }}>
          <InputLabel shrink style={{ fontSize: '21px', top: '0px', marginLeft: '-15px', fontFamily: 'Roboto, sans-serif' }}>Question</InputLabel>
          <textarea
            name="questions"
            value={formData.questions}
            onChange={handleChange}
            required
            className="textarea"
            style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
          />
          {errors.questions && <span style={{ color: 'red', fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>{errors.questions}</span>}
        </FormControl>

        <br />
        <div className="category-container" style={{ marginTop: '-10px', marginRight: '10px', fontFamily: 'Roboto, sans-serif' }}>
          <InputLabel shrink className="category-label" style={{ fontFamily: 'Roboto, sans-serif' }}>Category</InputLabel>
          <input
            type="radio"
            id="business"
            name="category"
            value="business"
            checked={formData.category === 'business'}
            onChange={handleChange}
          />
          <label htmlFor="business" style={{ marginRight: '30px', fontFamily: 'Roboto, sans-serif' }}>Business</label>

          <input
            type="radio"
            id="love"
            name="category"
            value="love"
            checked={formData.category === 'love'}
            onChange={handleChange}
          />
          <label htmlFor="love" style={{ marginRight: '30px', fontFamily: 'Roboto, sans-serif' }}>Love</label>

          <input
            type="radio"
            id="general"
            name="category"
            value="general"
            checked={formData.category === 'general'}
            onChange={handleChange}
          />
          <label htmlFor="general" style={{ fontFamily: 'Roboto, sans-serif' }}>General</label>
        </div>
        {errors.category && <span style={{ color: 'red', fontSize: '14px', fontFamily: 'Roboto, sans-serif' }}>{errors.category}</span>}

        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            backgroundColor: formValid ? '#652C8F' : '#ccc',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            width: '350px',
            height: '40px',
            marginTop: '20px',
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
          }}
          disabled={!formValid}
        >
          Next
        </button>
        <br />
        <br />
      </div>
      <br />
    </div>
  );
};

function Validation(values) {
  let errors = {};
  const allowedCharsPattern = /^[A-Za-z0-9 ?.,]*$/;
  const wordLimit = 100;

  if (!values.currentdate) {
    errors.currentdate = '';
  }

  if (!values.currenttime) {
    errors.currenttime = '';
  }

  if (!values.questions) {
    errors.questions = '';
  } else if (!allowedCharsPattern.test(values.questions)) {
    errors.questions = 'Question contains invalid characters. ';
  } else {
    const wordCount = values.questions.trim().split(/\s+/).length;
    if (wordCount > wordLimit) {
      errors.questions = `Question exceeds ${wordLimit} words limit.`;
    }
  }

  return errors;
}

export default QueryPage;
