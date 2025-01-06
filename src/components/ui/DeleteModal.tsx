import { FC, useEffect, useRef } from 'react';
import Button from './Button';

type DeleteModalProps = {
  onConfirm: (id: string | number) => void;
  onCancel?: () => void;
  delteItemId: string | null | number;
  viewButton?: boolean;
};

const DeleteModal: FC<DeleteModalProps> = ({
  onConfirm,
  viewButton = false,
  onCancel,
  delteItemId,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    modalRef.current?.showModal();
  };

  const handleClose = () => {
    modalRef.current?.close();
    onCancel?.();
  };

  useEffect(() => {
    if (delteItemId) {
      handleOpen();
    }
  }, [delteItemId]);

  if (!delteItemId) return null;

  return (
    <div>
      {viewButton && <Button onClick={handleOpen}>х</Button>}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box rounded-lg p-6 flex flex-col items-center text-center">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            onClick={handleClose}
          >
            ✕
          </button>
          <span className="text-xl text-slate-300 mb-4">Удалить</span>
          <h3 className="font-bold text-lg mb-2">
            Вы уверены, что хотите удалить этот элемент?
          </h3>
          <div className="flex gap-4 mt-4">
            <Button className="btn btn-outline" onClick={handleClose}>
              Нет, отмените
            </Button>
            <Button
              className="btn btn-error bg-red-400 text-white"
              onClick={() => {
                onConfirm(delteItemId);
                handleClose();
              }}
            >
              Да, я уверен
            </Button>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={handleClose}
        ></form>
      </dialog>
    </div>
  );
};

export default DeleteModal;
