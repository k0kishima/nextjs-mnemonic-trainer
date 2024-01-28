import React from 'react';
import { cn } from '@/lib/utils';

export interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ElementType<React.ComponentPropsWithRef<'svg'>>;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ Icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          className={cn(
            'peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500',
            className,
          )}
        />
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    );
  },
);

InputWithIcon.displayName = 'InputWithIcon';

export { InputWithIcon };
