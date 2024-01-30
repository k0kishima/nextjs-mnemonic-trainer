import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ElementType<React.ComponentPropsWithRef<'svg'>>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ Icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          className={cn(
            'peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500',
            Icon ? 'pl-10' : 'pl-4',
            className,
          )}
        />
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        )}
      </div>
    );
  },
);

Input.displayName = 'InputWithIcon';

export default Input;
