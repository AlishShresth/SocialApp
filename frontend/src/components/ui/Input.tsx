import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className = "",
    label,
    helperText,
    error,
    errorMessage,
    startIcon,
    endIcon,
    containerClassName = "",
    id,
    required,
    disabled,
    ...props
  }, ref) => {
    // Generate a unique ID if none is provided
    const inputId = id || React.useId();

    return (
      <div className={`w-full space-y-2 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`
              block text-sm font-medium
              ${error ? 'text-red-500 dark:text-red-400' : 'text-gray-700 dark:text-gray-200'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {label}
            {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
              w-full
              px-4 py-2 text-sm
              border rounded-md
              ${startIcon ? 'pl-10' : ''}
              ${endIcon ? 'pr-10' : ''}
              ${error
                ? 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'
              }
              ${disabled
                ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700'
              }
              text-gray-900 dark:text-gray-100
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:border-transparent
              disabled:opacity-50
              transition-colors duration-200
              ${className}
            `}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={`${inputId}-description`}
            {...props}
          />

          {endIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              {endIcon}
            </div>
          )}
        </div>

        {(helperText || errorMessage) && (
          <p
            id={`${inputId}-description`}
            className={`
              text-sm
              ${error
                ? 'text-red-500 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
              }
            `}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"