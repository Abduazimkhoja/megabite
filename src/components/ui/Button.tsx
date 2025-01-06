import { FC, JSX, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  beforeEl?: string | ReactNode;
  afterEl?: string | ReactNode;
  loading?: boolean;
} & JSX.IntrinsicElements['button'];

const Button: FC<Props> = ({
  children,
  beforeEl,
  afterEl,
  loading,
  className = '',
  disabled,
  ...rest
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`btn ${className}`}
      {...rest}
    >
      {loading ? <span className="loading loading-spinner"></span> : beforeEl}
      {children}
      {afterEl}
    </button>
  );
};

export default Button;
