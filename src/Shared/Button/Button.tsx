import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  loadingText,
  className = '',
  onClick,
  fullWidth = false,
  icon,
  iconPosition = 'left'
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const buttonText = loading && loadingText ? loadingText : children;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ''}
        ${isDisabled ? styles.disabled : ''}
        ${className}
      `}
    >
      {loading && (
        <i className={`fa fa-spin fa-spinner ${styles.loadingIcon}`}></i>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      
      <span className={styles.buttonText}>{buttonText}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </button>
  );
}
