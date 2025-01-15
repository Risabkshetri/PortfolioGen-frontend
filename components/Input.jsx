import React from 'react';

const Input = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  labelClassName = "",
  error,
  helpText,
  ...props
}) => {
  // Generate a unique ID if none provided
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="space-y-2">
      {label && (
        <label 
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClassName}`} 
          htmlFor={inputId}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
          {helpText && (
            <span className="text-xs text-muted-foreground ml-2">
              ({helpText})
            </span>
          )}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
          ring-offset-background file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-muted-foreground 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
          ${error ? 'border-destructive' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;