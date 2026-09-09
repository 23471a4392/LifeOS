import React from 'react';

export const RealHandWave = ({ className = "w-7 h-7 inline-block ml-2" }) => {
  return (
    <span className={`inline-flex items-center justify-center origin-[70%_70%] animate-[wave_2.5s_infinite] hover:animate-[wave_1s_infinite] cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Palm & Wrist with human skin tone and shading */}
        <path
          d="M18.8 32C15.6 32 13 29.4 13 26.2V22.5L13.8 21.2C14.6 19.9 16 19.1 17.5 19.1H18.5V11.2C18.5 9.8 19.6 8.7 21 8.7C22.4 8.7 23.5 9.8 23.5 11.2V17.5H24.5C25.9 17.5 27 18.6 27 20V26.2C27 29.4 24.4 32 21.2 32H18.8Z"
          fill="#F5C096"
        />
        {/* Fingers */}
        {/* Index Finger */}
        <path
          d="M16 19.5V8.5C16 7.1 17.1 6 18.5 6C19.9 6 21 7.1 21 8.5V19.5"
          stroke="#E5A578"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="#FBD3B6"
        />
        {/* Middle Finger */}
        <path
          d="M20.5 17V5.5C20.5 4.1 21.6 3 23 3C24.4 3 25.5 4.1 25.5 5.5V17"
          stroke="#E5A578"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="#FCE0CA"
        />
        {/* Ring Finger */}
        <path
          d="M25 18V7.5C25 6.1 26.1 5 27.5 5C28.9 5 30 6.1 30 7.5V18"
          stroke="#E5A578"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="#FBD3B6"
        />
        {/* Pinky Finger */}
        <path
          d="M29.5 20V11.5C29.5 10.4 30.4 9.5 31.5 9.5C32.6 9.5 33.5 10.4 33.5 11.5V20C33.5 25.5 29 30 23.5 30"
          stroke="#E5A578"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="#F5C096"
        />
        {/* Thumb */}
        <path
          d="M14 23L9.5 18.5C8.5 17.5 6.9 17.5 5.9 18.5C4.9 19.5 4.9 21.1 5.9 22.1L12.5 28.7"
          stroke="#E5A578"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="#FBD3B6"
        />
      </svg>
    </span>
  );
};
