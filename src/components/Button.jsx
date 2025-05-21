import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size,
  className = '',
  onClick,
  to,
  type = 'button',
  disabled = false,
  icon: Icon,
  ...props
}) => {
  const buttonContent = (
    <>
      {Icon && <Icon className="me-2" />}
      {children}
    </>
  );

  if (to) {
    return (
      <BootstrapButton
        as={Link}
        to={to}
        variant={variant}
        size={size}
        className={className}
        disabled={disabled}
        {...props}
      >
        {buttonContent}
      </BootstrapButton>
    );
  }

  return (
    <BootstrapButton
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {buttonContent}
    </BootstrapButton>
  );
};

export default Button; 