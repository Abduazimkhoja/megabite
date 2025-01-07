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
      className={`btn py-1 px-4 rounded bg-gray-200 disabled:bg-gray-200 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {loading ? <span className="loading loading-spinner"></span> : beforeEl}
      {children}
      {afterEl}
    </button>
  );
};

export default Button;
