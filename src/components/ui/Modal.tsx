import { FC, useRef, JSX } from 'react';

type Props = {
  label: string;
  buttonClassName?: string;
  buttonLabel: string;
  closeOutside?: boolean;
  closeButton?: boolean;
  buttonProps?: Omit<JSX.IntrinsicElements['button'], 'children'> & {
    loading?: boolean;
  };
} & JSX.IntrinsicElements['div'];

const Modal: FC<Props> = ({
  label,
  children,
  buttonLabel = '',
  className = '',
  buttonClassName = '',
  closeOutside = true,
  buttonProps,
  closeButton = false,
  ...rest
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={`z-1`} {...rest}>
      <button
        {...buttonProps}
        className={`btn text-white z-1 ${buttonClassName}`}
        onClick={(e) => {
          modalRef?.current?.showModal();
          buttonProps?.onClick?.(e);
        }}
        disabled={buttonProps?.disabled || buttonProps?.loading}
      >
        {buttonProps?.loading ? (
          <span className="loading loading-spinner size-4"></span>
        ) : (
          buttonLabel
        )}
      </button>
      <dialog ref={modalRef} id="my_modal_2" className={`modal`}>
        <div className={`modal-box rounded-[40px] ${className}`}>
          <h3 className="font-bold text-lg mb-4">{label}</h3>
          <form method="dialog">
            {closeButton && (
              <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                ✕
              </button>
            )}
            {children}
          </form>
        </div>
        {closeOutside && (
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        )}
      </dialog>
    </div>
  );
};

export default Modal;
