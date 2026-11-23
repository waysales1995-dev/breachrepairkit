'use client';

import type { HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export default function SpotlightCard({ children, className = '', ...props }: Props) {
  return (
    <div
      {...props}
      className={`spotlight-card ${className}`}
      onMouseMove={(event) => {
        event.currentTarget.style.setProperty('--x', `${event.nativeEvent.offsetX}px`);
        event.currentTarget.style.setProperty('--y', `${event.nativeEvent.offsetY}px`);
        props.onMouseMove?.(event);
      }}
    >
      {children}
    </div>
  );
}
