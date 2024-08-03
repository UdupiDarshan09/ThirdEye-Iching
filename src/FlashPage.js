import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlashPage.css';

const FlashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/LandingPage');
    }, 2000); // Navigate after 2000ms (2 seconds)

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [navigate]);

  return (
    <div className="flash-container">
      <div className="row">
        <div className="rectangle" style={{ animationDelay: '500ms' }}></div>
        <div className="rectangle" style={{ animationDelay: '600ms' }}></div>
      </div>
      <div className="row">
        <div className="rectangle" style={{ animationDelay: '400ms' }}></div>
        <div className="rectangle" style={{ animationDelay: '700ms' }}></div>
      </div>
      <div className="row">
        <div className="rectangle" style={{ animationDelay: '300ms' }}></div>
        <div className="rectangle" style={{ animationDelay: '800ms' }}></div>
      </div>
      <div className="row">
        <div className="rectangle" style={{ animationDelay: '200ms' }}></div>
        <div className="rectangle" style={{ animationDelay: '900ms' }}></div>
      </div>
      <div className="row">
        <div className="rectangle" style={{ animationDelay: '100ms' }}></div>
        <div className="rectangle" style={{ animationDelay: '1000ms' }}></div>
      </div>
      <div className="row">
        <div className="rectangle" style={{ animationDelay: '0ms' }}></div>
        <div className="rectangle" style={{ animationDelay: '1100ms' }}></div>
      </div>
    </div>
  );
};

export default FlashPage;
