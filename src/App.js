import logo from './logo.svg';
import './App.css';
// src/App.js
import React from 'react';
import MatrixRain from './MatrixRain'; // Adjust path if needed

function App() {
  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <MatrixRain />
      <div style={{
        position: 'absolute', // Important for layering over the canvas
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        zIndex: 1, // Ensure text is above the canvas
        textAlign: 'center',
        fontSize: '2rem'
      }}>
        <h1>Welcome to the Matrix</h1>
        <p>This text is displayed on top of the rain.</p>
      </div>
    </div>
  );
}

export default App;

