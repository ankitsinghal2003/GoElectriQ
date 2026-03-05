import React from 'react';

export function Button({ className = '', size = 'md', variant = 'solid', children, ...props }) {
  const sizeClasses =
    size === 'lg'
      ? 'px-4 py-3 text-base'
      : size === 'sm'
      ? 'px-3 py-1.5 text-sm'
      : 'px-4 py-2 text-sm';

  const baseClasses =
    variant === 'outline'
      ? 'border bg-transparent'
      : 'bg-[#5CE65C] text-white';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors ${baseClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

