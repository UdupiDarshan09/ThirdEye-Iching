import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Report.css'; // Assuming you have a CSS file for additional styles

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, decodedHex1, decodedHex2, personalData: passedPersonalData, comments, reports } = location.state || {};
  const [personalData, setPersonalData] = useState(passedPersonalData || null);
  const [queryData, setQueryData] = useState(null);

  useEffect(() => {
    if (!personalData) {
      const storedPersonalData = JSON.parse(localStorage.getItem('personalData'));
      if (storedPersonalData) {
        setPersonalData(storedPersonalData);
      }
    }

    const storedQueryData = JSON.parse(localStorage.getItem('queryData'));
    if (storedQueryData) {
      setQueryData(storedQueryData);
    }
  }, [personalData]);

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Iching Report', 14, 22);
    
    doc.setFontSize(12);
    if (personalData) {
      doc.text(`Name: ${personalData.name}`, 14, 30);
      doc.text(`Date and Time of Birth: ${new Date(personalData.dob).toLocaleDateString('en-GB')} ${personalData.tob}`, 14, 36);
      doc.text(`Place of Birth: ${personalData.pob}`, 14, 42);
    }
    if (queryData) {
      doc.text(`Current Date: ${new Date(queryData.currentdate).toLocaleDateString('en-GB')}`, 14, 48);
      doc.text(`Question: ${queryData.questions}`, 14, 54);
      doc.text(`(Time: ${queryData.currenttime})`, 14, 60);
    }
  
    doc.text(` ${decodedHex1}`, 14, 66);
    doc.text(` ${decodedHex2}`, 14, 72);
  
    if (comments) {
      doc.text('Comments:', 14, 78);
      doc.text(comments, 14, 84);
    }
  
    if (reports) {
      reports.forEach((report, index) => {
        const yOffset = 90 + (index * 20);
        
        doc.text(`  Question: ${report.query}`, 14, yOffset + 6);
        doc.text(`  Current Time: ${report.currentTime}`, 14, yOffset + 12);
        doc.text(`  Hexagram 1: ${report.hex1}`, 14, yOffset + 18);
        doc.text(`  Hexagram 2: ${report.hex2}`, 14, yOffset + 24);
        if (report.comments) {
          doc.text(`  Comments: ${report.comments}`, 14, yOffset + 30);
        }
      });
    }
  
    const filename = personalData ? `${personalData.name}.pdf` : 'Iching_Report.pdf';
  
    doc.save(filename);
  };
  
  const handleExit = () => {
    localStorage.removeItem('personalData');
    localStorage.removeItem('queryData');
    localStorage.removeItem('reports');

    setPersonalData(null);
    setQueryData(null);

    navigate('/LandingPage');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ overflowY: 'auto', padding: '0 20px', flex: 1 }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/LandingPage')}
            style={{
              backgroundColor: 'none',
              color: '#652C8F',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '-10px', // Move button to the left
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
            Back
          </button>
        </div>
        <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '30px', marginBottom: '10px' }}>Iching Report</h2>
        <div>
          {personalData && (
            <div>
              <p><strong>Name:</strong> {personalData.name}</p>
              <p><strong>Date and Time of Birth:</strong> {new Date(personalData.dob).toLocaleDateString('en-GB')} {personalData.tob}</p>
              <p><strong>Place of Birth:</strong> {personalData.pob}</p>
            </div>
          )}
          {queryData && (
            <div>
              <p><strong>Current Date:</strong> {new Date(queryData.currentdate).toLocaleDateString('en-GB')}</p>
              <p><strong>Q:</strong> {queryData.questions}</p>
              <p><strong>(Time:</strong> {queryData.currenttime})</p>
            </div>
          )}
          <div>
            <p>{decodedHex1}</p>
            <p>{decodedHex2}</p>
          </div>
          {comments && (
            <div>
              <h3>Comments:</h3>
              <p>{comments}</p>
            </div>
          )}
          {reports && reports.map((report, index) => (
            <div key={index} style={{ marginTop: '20px', width: '100%' }}>
              <div>
                <p><strong>Question:</strong> {report.query}</p>
                <p><strong>Time:</strong> {report.currentTime}</p>
              </div>
              <div>
                <p><strong></strong> {report.hex1}</p>
                <p><strong></strong> {report.hex2}</p>
              </div>
              {report.comments && (
                <div>
                  <h3>Comments:</h3>
                  <p>{report.comments}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', gap: '10px', padding: '20px' }}>
        <button
          onClick={handleDownloadReport}
          style={{
            backgroundColor: '#652C8F',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            width: '350px',
            height: '40px',
          }}
        >
          Download Report
        </button>
        <button
          onClick={handleExit}
          style={{
            backgroundColor: '#f0f0f0',
            color: '#652C8F',
            padding: '10px 20px',
            border: `2px solid #652C8F`,
            borderRadius: '20px',
            cursor: 'pointer',
            width: '350px',
            height: '40px',
          }}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Report;
