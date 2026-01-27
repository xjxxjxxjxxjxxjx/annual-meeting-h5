'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        relative
        overflow-hidden
        transition-all
        duration-300
        ease-in-out
        transform
        hover:scale-105
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
