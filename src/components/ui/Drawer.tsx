import { clsx } from 'clsx';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';

const openClassNames = {
  right: 'translate-x-0',
  left: 'translate-x-0',
  top: 'translate-y-0',
  bottom: 'translate-y-0',
};

const closeClassNames = {
  right: 'translate-x-full',
  left: '-translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full',
};

const classNames = {
  right: 'inset-y-0 right-0',
  left: 'inset-y-0 left-0',
  top: 'inset-x-0 top-0',
  bottom: 'inset-x-0 bottom-0',
};

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  side: keyof typeof classNames;
  children: ReactNode;
};

export const Drawer: FC<Props> = ({
  children,
  open,
  setOpen,
  side = 'right',
}) => {
  const handleClose = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <div
      id={`dialog-${side}`}
      className="relative z-10"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={clsx(
          'fixed inset-0 bg-gray-500 bg-opacity-75 transition-all',
          {
            'opacity-100 duration-500 ease-in-out visible': open,
          },
          { 'opacity-0 duration-500 ease-in-out invisible': !open },
        )}
      ></div>
      <div className={clsx({ 'fixed inset-0 overflow-hidden': open })}>
        <div onClick={handleClose} className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              'pointer-events-none fixed max-w-full',
              classNames[side],
            )}
          >
            <div
              className={clsx(
                'pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500',
                { [closeClassNames[side]]: !open },
                { [openClassNames[side]]: open },
              )}
              // onClick={(event) => {
              //   event.preventDefault();
              //   event.stopPropagation();
              // }}
            >
              <div
                className={clsx(
                  'flex flex-col h-full overflow-y-scroll bg-white p-10 shadow-xl bg-blue-400 rounded-lg',
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
