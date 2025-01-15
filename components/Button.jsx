import React from 'react';

const Button = React.forwardRef(({
  children,
  className = "",
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={`
        inline-flex items-center justify-center 
        rounded-md text-sm font-medium
        bg-blue-600 dark:bg-blue-500 
        text-white dark:text-white
        hover:bg-blue-700 dark:hover:bg-blue-600
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        h-10 px-4 py-2 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;