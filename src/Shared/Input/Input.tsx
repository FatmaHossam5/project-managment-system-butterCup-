import { ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import styles from './input.module.css';

// Helper function for phone number validation
export const validatePhoneNumber = (value: string) => {
  if (!value) return "Phone number is required";
  
  // Remove all non-digit characters for length check
  const digitsOnly = value.replace(/\D/g, '');
  
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return "Phone number must be between 7 and 15 digits";
  }
  
  // Check if it contains valid characters
  const phoneRegex = /^[\+]?[1-9]?[\s\-\(\)]?[\d\s\-\(\)\.]{7,20}$/;
  if (!phoneRegex.test(value)) {
    return "Please enter a valid phone number";
  }
  
  return true;
};

interface InputProps {
  // Legacy props for backward compatibility
  getSearchValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  
  // New enhanced props
  type?: string;
  placeholder?: string;
  label?: string;
  name?: string;
  register?: any;
  errors?: any;
  required?: boolean;
  validation?: any;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
  id?: string;
}

export default function Input({
  // Legacy props
  getSearchValue,
  placeHolder,
  
  // New props
  type = "text",
  placeholder,
  label,
  name,
  register,
  errors,
  required = false,
  validation = {},
  className = "",
  disabled = false,
  autoComplete,
  id
}: InputProps) {
  
  // Legacy search input rendering
  if (getSearchValue && placeHolder) {
    return (
      <>
        <div className="col-md-3">
          <div className="search position-relative">
            <CiSearch className={`position-absolute ${styles.searchIcon}`} />
            <input
              onChange={getSearchValue}
              type="text"
              className={`form-control ${styles.searchInput} rounded-5`}
              placeholder={placeHolder}
            />
          </div>
        </div>
      </>
    );
  }

  // New enhanced form input rendering
  const inputId = id || name;
  const hasError = errors && name && errors[name];
  const errorMessage = hasError ? errors[name].message : "";
  const finalPlaceholder = placeholder || placeHolder;

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={`${styles.inputLabel} color fs-6 mb-2 d-block`}
        >
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <div className={`${styles.inputWrapper} position-relative`}>
        <input
          id={inputId}
          type={type}
          placeholder={finalPlaceholder}
          className={`form-control ${styles.formInput} ${hasError ? styles.inputError : ''}`}
          disabled={disabled}
          autoComplete={autoComplete}
          {...(register && name ? register(name, {
            required: required ? `${label || 'This field'} is required` : false,
            ...validation
          }) : {})}
        />
        <hr className={`${styles.inputUnderline} ${hasError ? styles.errorUnderline : ''}`} />
        
        {/* Error Icon */}
        {hasError && (
          <div className={styles.errorIcon}>
            <i className="fas fa-exclamation-circle"></i>
          </div>
        )}
        
        {/* Success Icon for valid fields */}
        {!hasError && errors && name && errors[name] === undefined && (
          <div className={styles.successIcon}>
            <i className="fas fa-check-circle"></i>
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {hasError && (
        <span className={`${styles.errorMessage} text-danger`}>
          {errorMessage}
        </span>
      )}
      
      {/* Helper Text */}
      {!hasError && finalPlaceholder && (
        <span className={styles.helperText}>
          {finalPlaceholder}
        </span>
      )}
    </div>
  );
}
