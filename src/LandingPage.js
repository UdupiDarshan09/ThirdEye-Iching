import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClearIcon from '@mui/icons-material/Clear';
import { CalendarToday, AccessTime } from '@mui/icons-material';
import { InputLabel, FormControl } from '@mui/material';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '01:00 AM',
    pob: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const navigate = useNavigate();
  const datePickerRef = useRef(null);

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  useEffect(() => {
    setFormValid(Object.keys(errors).length === 0);
  }, [errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formValid) {
        const res = await axios.post('http://localhost:8081/personal', formData);
        if (res.status === 200) {
          setSuccessMessage('User created successfully');
          localStorage.setItem('personalData', JSON.stringify(formData));
          navigate('/QueryPage');
        } else {
          console.error('Unexpected response:', res);
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error.message);
    }
  };

  const toggleCalendar = () => {
    datePickerRef.current.setOpen(true);
  };

  return (
    <div>
      <br />
      <div className="container" style={{ marginTop: '-20px' }}>
        <br />
        <h2 style={{ fontFamily: 'Roboto, sans-serif', textAlign: 'left', fontSize: '30px', marginRight: '100px' }}>Personal Details</h2>
        <br />
        {successMessage && <p className="success-message" style={{ fontSize: '18px', fontFamily: 'Roboto, sans-serif' }}>{successMessage}</p>}
        {errors.general && <p className="error-message" style={{ fontSize: '18px', fontFamily: 'Roboto, sans-serif' }}>{errors.general}</p>}

        <div className="input-container" style={{ position: 'relative', marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ fontSize: '16px', width: '300px', fontFamily: 'Roboto, sans-serif' }}
          />
          {errors.name && <span className="error-message" style={{ fontSize: '16px', color: 'red', display: 'block', marginTop: '5px', fontFamily: 'Roboto, sans-serif' }}>{errors.name}</span>}
        </div>

        <div className="input-container" style={{ marginBottom: '20px' }}>
          <FormControl className="form-control" fullWidth>
            <InputLabel shrink style={{ fontSize: '20px', backgroundColor: '#f0f0f0', paddingRight: '10px', left: '-3px', top: '0px', fontFamily: 'Roboto, sans-serif' }}>
              Date of Birth
            </InputLabel>
            <div className="date-of-birth-container" style={{ display: 'flex', alignItems: 'center' }}>
              <DatePicker
                ref={datePickerRef}
                selected={formData.dob}
                onChange={(date) => setFormData({ ...formData, dob: date })}
                dateFormat="dd-MM-yyyy"
                className="date-picker-input"
                style={{ display: 'inline-block', width: 'calc(100% - 36px)', fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
                customInput={
                  <div onClick={toggleCalendar} style={{ cursor: 'pointer', fontFamily: 'Roboto, sans-serif' }}>
                    {formData.dob ? formData.dob.toLocaleDateString() : ''}
                  </div>
                }
              />
              <CalendarToday
                className="calendar-icon"
                onClick={toggleCalendar}
                style={{ cursor: 'pointer', fontSize: '18px', marginRight: '9px' }}
              />
            </div>
            {errors.dob && <span className="error-message" style={{ fontSize: '16px', color: 'red', display: 'block', marginTop: '5px', fontFamily: 'Roboto, sans-serif' }}>{errors.dob}</span>}
          </FormControl>
        </div>

        <div className="input-container" style={{ position: 'relative', marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}>Time of Birth</label>
          <input
            type="text"
            name="tob"
            value={formData.tob}
            onChange={handleChange}
            required
            style={{ fontSize: '16px', width: '300px', fontFamily: 'Roboto, sans-serif' }}
          />
          <button
            className="time-picker-button"
            onClick={() => setShowTimeModal(true)}
            style={{ fontSize: '18px', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Roboto, sans-serif' }}
          >
            <AccessTime style={{ fontSize: '18px' }} />
          </button>
          {showTimeModal && (
            <div className="time-modal">
              <h3 style={{ fontSize: '18px', fontFamily: 'Roboto, sans-serif' }}>Select Time</h3>
              <div className="time-picker">
                <select
                  className="time-picker-input"
                  value={formData.tob.split(':')[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tob: `${e.target.value}:${formData.tob.split(':')[1]}`,
                    })
                  }
                  style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <option key={hour} value={hour < 10 ? `0${hour}` : `${hour}`}>
                      {hour < 10 ? `0${hour}` : hour}
                    </option>
                  ))}
                </select>
                <span>:</span>
                <select
                  className="time-picker-input"
                  value={formData.tob.split(':')[1]?.split(' ')[0] || '00'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tob: `${formData.tob.split(':')[0]}:${e.target.value} ${
                        formData.tob.split(' ')[1] || 'AM'
                      }`,
                    })
                  }
                  style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <option key={minute} value={minute < 10 ? `0${minute}` : `${minute}`}>
                      {minute < 10 ? `0${minute}` : minute}
                    </option>
                  ))}
                </select>
                <select
                  className="time-picker-input"
                  value={formData.tob.split(' ')[1] || 'AM'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tob: `${formData.tob.split(' ')[0]} ${e.target.value}`,
                    })
                  }
                  style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <button
                onClick={() => setShowTimeModal(false)}
                className="close-button"
                style={{ fontSize: '16px', marginTop: '20px', fontFamily: 'Roboto, sans-serif' }}
              >
                Close
              </button>
            </div>
          )}
          {errors.tob && <span className="error-message" style={{ fontSize: '16px', color: 'red', display: 'block', marginTop: '5px', fontFamily: 'Roboto, sans-serif' }}>{errors.tob}</span>}
        </div>

        <div className="input-container" style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', fontFamily: 'Roboto, sans-serif' }}>Place of Birth</label>
          <input
            type="text"
            name="pob"
            value={formData.pob}
            onChange={handleChange}
            required
            style={{ fontSize: '16px', width: '300px', fontFamily: 'Roboto, sans-serif' }}
          />
          {errors.pob && <span className="error-message" style={{ fontSize: '16px', color: 'red', display: 'block', marginTop: '5px', fontFamily: 'Roboto, sans-serif' }}>{errors.pob}</span>}
        </div>

        <div className="button-container">
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
            fontSize: '16px'
          }}
          disabled={!formValid}
        >
          Next
        </button>
        </div>
      </div>
    </div>
  );
};

function validate(values) {
  const errors = {};
  const namePattern = /^[A-Za-z\s]+$/;

  if (!values.name) {
    errors.name = 'Name is required';
  } else if (!namePattern.test(values.name)) {
    errors.name = 'Accepts only Texts and spaces';
  }

  if (!values.dob) {
    errors.dob = 'Date of Birth is required';
  }

  if (!values.tob) {
    errors.tob = 'Time of Birth is required';
  }

  if (!values.pob) {
    errors.pob = 'Place of Birth is required';
  } else if (!namePattern.test(values.pob)) {
    errors.pob = 'Accepts only Texts and spaces';
  }

  return errors;
}
export default SignUp;
