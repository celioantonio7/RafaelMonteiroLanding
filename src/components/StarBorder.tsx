import React from 'react';
import './StarBorder.css';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string; // e.g., "#fff, #4facfe, #fff"
  speed?: React.CSSProperties['animationDuration'];
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = '#ffffff, #333333, #ffffff', 
  speed = '6s',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  return (
    <Component
      className={`star-border-container ${className}`}
      {...(rest as any)}
    >
      <div
        className="border-gradient-full"
        style={{
          /* Linear gradient instead of spinning conic gradient */
          background: `linear-gradient(45deg, ${color})`,
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;