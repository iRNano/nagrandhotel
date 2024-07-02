import React from 'react'

interface ButtonProps {
  location ?: string;
  size ?: string;
  className ?: string;
  onClick ?: ()=>void;
}

const Button:React.FC<ButtonProps> = ({className, onClick, children}) => {
  return <button className={className} onClick={onClick}>{children}</button>
}

export default Button;