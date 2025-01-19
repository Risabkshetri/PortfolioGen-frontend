'use client';

import React from 'react';

const VisuallyHidden = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
      style={{
        clip: 'rect(0, 0, 0, 0)',
        clipPath: 'inset(50%)',
        margin: '-1px',
      }}
    >
      {children}
    </span>
  );
};

export default VisuallyHidden;