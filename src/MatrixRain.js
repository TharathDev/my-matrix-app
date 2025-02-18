import React, { useState, useEffect, useRef } from 'react';

function MatrixRain() {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
  const [speed, setSpeed] = useState(0.5); // Start slower

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 20; // Increased font size
    const columns = canvasWidth / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Slightly increased alpha
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize + (fontSize * 0.8)); // Vertical spacing

        if (drops[i] * fontSize > canvasHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed;
      }
    };

    let animationFrameId;
    const renderScene = () => {
      draw();
      animationFrameId = requestAnimationFrame(renderScene);
    };
    renderScene();

    const handleResize = () => {
      setCanvasWidth(window.innerWidth);
      setCanvasHeight(window.innerHeight);
      const newColumns = window.innerWidth / fontSize;
      drops.length = 0;
      for (let x = 0; x < newColumns; x++) {
        drops[x] = 1;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasWidth, canvasHeight, speed]);

  const handleSpeedChange = (event) => {
    setSpeed(parseFloat(event.target.value));
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundColor: 'black',
        }}
      />
      <div style={{ position: 'fixed', top: '10px', left: '10px', zIndex: 10, color: 'white' }}>
        <label htmlFor="speed">Speed: </label>
        <input
          type="range"
          id="speed"
          min="0.1"
          max="2"
          step="0.1"
          value={speed}
          onChange={handleSpeedChange}
        />
        <span>{speed}</span>
      </div>
    </>
  );
}

export default MatrixRain;

