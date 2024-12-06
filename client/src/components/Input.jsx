import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  placeholder = 'Enter text...',
  value,
  onChange,
  icon,
  error,
  disabled = false,
  size = 'medium',
  className,
  ...rest
}) => {
  const sizeClasses = {
    small: 'py-2 px-3 text-sm',
    medium: 'py-3 px-4 text-base',
    large: 'py-4 px-5 text-lg',
  };

  return (
    <div
      className={` w-full relative my-3 ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      {icon && (
        <span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
          {icon}
        </span>
      )}
      {/* <label className='sr-only'>{placeholder}</label> */}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-[100%] border-2 rounded-lg  
          ${sizeClasses[size]} 
          ${
            error ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
          }
          focus:outline-none transition-all duration-300
          ${disabled ? 'bg-gray-100' : ''}
          ${className}
        `}
        {...rest}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.node,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Input;
