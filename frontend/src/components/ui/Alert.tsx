import React from 'react'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning'
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      destructive: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800',
      success: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800',
      warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yello-800'
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={`rounded-lg border p-4 ${variants[variant]} ${className}`}
        {...props}>
        {children}
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', children, ...props }, ref) => (
    <h5
      ref={ref}
      className={`font-medium mb-1 ${className}`}
      {...props}
    >
      {children}
    </h5>
  )
)
AlertTitle.displayName = 'AlertTitle'

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', children, ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm ${className}`}
      {...props}
    >
      {children}
    </p>
  )
)
AlertDescription.displayName = 'AlertDescription'