import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label = '', hasError = false, helperText = '', ...props }: InputProps,
    ref
  ) => {
    return (
      <div className="mb-4">
        {label ? (
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={props.id}
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          className={`appearance-none border ${
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'focus:border-blue-500'
          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="text"
          placeholder={label}
          {...props}
        />
        {helperText ? (
          <p
            className={`${
              hasError ? 'text-red-500' : 'text-blue-500'
            } text-xs italic`}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

export { Input };
