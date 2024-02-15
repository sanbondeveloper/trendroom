import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface IValidationMessageProps {
  message?: string;
}
export default function ValidationMessage({ message }: IValidationMessageProps) {
  return (
    <div className="mt-2 flex items-center">
      <ExclamationCircleIcon className="w-3.5 text-red-500" />
      <p className="text-xs italic text-red-500"> {message || ''}</p>
    </div>
  );
}
