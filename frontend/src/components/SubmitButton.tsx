import React from 'react';

interface SubmitButtonProps {
  label: string;
  className?: string;
}

export default function SubmitButton({ label, className = '' }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`w-full py-3.5 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg mt-2 cursor-pointer ${className}`}
      style={{ backgroundColor: 'var(--primary-color)' }}
    >
      {label}
    </button>
  );
}
