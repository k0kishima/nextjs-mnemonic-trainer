'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster"
      toastOptions={{
        classNames: {
          toast:
            'bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-700 shadow-lg',
          description: 'text-gray-500 dark:text-gray-400',
          actionButton: 'bg-blue-500 text-white',
          cancelButton:
            'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
