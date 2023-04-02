import React, { useRef, useEffect } from "react";

const Wave = () => {
  const canvasRef = useRef(null);

  const drawWave = (canvas, context, position, phase, waveHeightFactor) => {
    const width = canvas.width;
    const height = canvas.height;
    const waveHeight = (height / 4) * waveHeightFactor;

    context.beginPath();
    context.moveTo(0, position);
    context.quadraticCurveTo(
      width / 4,
      position - waveHeight + Math.sin(phase) * waveHeight,
      width / 2,
      position
    );
    context.quadraticCurveTo(
      (3 * width) / 4,
      position + waveHeight + Math.sin(phase + Math.PI) * waveHeight,
      width,
      position
    );
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.closePath();
    context.fillStyle = "#f8b24e";
    context.fill();
  };

  const randomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const position = canvas.height / 2;
    const waveHeightFactor = randomBetween(0.2, 1);

    let phase = 0;
    const waveSpeed = 0.015;

    const animateWave = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawWave(canvas, context, position, phase, waveHeightFactor);
      phase += waveSpeed;
      requestAnimationFrame(animateWave);
    };

    animateWave();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Wave;
