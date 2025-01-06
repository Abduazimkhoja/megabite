import DeleteIcon from '@/assets/icons/delete.svg';
import { FC, useEffect, useRef } from 'react';
import TableActionBtn from './table/TableActionBtn';

type DeleteModalProps = {
  onConfirm: (id: string) => void;
  onCancel?: () => void;
  delteItemId: string | null;
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
      {viewButton && (
        <TableActionBtn visualType="delete" onClick={handleOpen} />
      )}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box rounded-lg p-6 flex flex-col items-center text-center">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
            onClick={handleClose}
          >
            ✕
          </button>
          <DeleteIcon className="size-16 text-slate-300 mb-4" />
          <h3 className="font-bold text-lg mb-2">
            Вы уверены, что хотите удалить этот элемент?
          </h3>
          <div className="flex gap-4 mt-4">
            <button className="btn btn-outline" onClick={handleClose}>
              Нет, отмените
            </button>
            <button
              className="btn btn-error text-white"
              onClick={() => {
                onConfirm(delteItemId);
                handleClose();
              }}
            >
              Да, я уверен
            </button>
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
