// src/components/auth/FormInput.tsx
import {  forwardRef, type InputHTMLAttributes } from 'react';
import { type IconType } from 'react-icons';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: IconType;
  error?: string;
  togglePassword?: {
    show: boolean;
    onToggle: () => void;
  };
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon: Icon, togglePassword, error, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
        <div className="relative">
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
          <input
            ref={ref}
            {...props}
            className={`w-full pl-12 ${togglePassword ? 'pr-12' : 'pr-5'} py-4 rounded-xl 
              bg-gray-800/60 border border-gray-600 text-white placeholder-gray-500 
              focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:bg-gray-800/70 
              transition-all outline-none ${error ? 'border-red-500' : ''}`}
          />
          {togglePassword && (
            <button
              type="button"
              onClick={togglePassword.onToggle}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition text-xl"
              aria-label={togglePassword.show ? 'Hide password' : 'Show password'}
            >
              {togglePassword.show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

export default FormInput;