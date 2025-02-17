import * as React from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  containerClassName?: string;
  characterCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className = "",
    label,
    helperText,
    error,
    errorMessage,
    containerClassName = "",
    id,
    required,
    disabled,
    characterCount = false,
    maxLength,
    value = "",
    ...props
  }, ref) => {
    // Generate a unique ID if none is provided
    const textareaId = id || React.useId();

    // Calculate remaining characters
    const remainingChars = maxLength ? maxLength - value.toString().length : null;

    return (
      <div className={`w-full space-y-2 ${containerClassName}`}>
        {label && (
          <div className="flex justify-between items-center">
            <label
              htmlFor={textareaId}
              className={`
                block text-sm font-medium
                ${error ? 'text-red-500 dark:text-red-400' : 'text-gray-700 dark:text-gray-200'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {label}
              {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
            </label>

            {characterCount && maxLength && (
              <span className={`
                text-xs
                ${remainingChars && remainingChars <= 10
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-gray-500 dark:text-gray-400'}
              `}>
                {remainingChars}/{maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full
            px-4 py-3 text-sm
            border rounded-md
            resize-y min-h-[100px]
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
          maxLength={maxLength}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${textareaId}-description`}
          value={value}
          {...props}
        />

        <div className="flex justify-between items-start">
          {(helperText || errorMessage) && (
            <p
              id={`${textareaId}-description`}
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
      </div>
    )
  }
)

Textarea.displayName = "Textarea"