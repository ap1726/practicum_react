import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import { useEffect, FC, ReactElement } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useAppDispatch } from "../../utils/hooks"; 
import {
  CLOSE_MODAL
} from "../../services/actions/actions";

interface IModalType {
  body: ReactElement,
  title?: string,
  onClose?: Function
}

const Modal: FC<IModalType> = ({ body, title = "", onClose }) => {
  const modalRoot = document.getElementById("modals") as HTMLElement;
  const dispatch = useAppDispatch();
  const handleCloseModal =() => {
      dispatch({ type: CLOSE_MODAL });
      onClose && onClose();
  }


  useEffect(() => {
    const closeModalByEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && handleCloseModal();
    };
    document.addEventListener("keydown", closeModalByEsc);

    return () => {
      document.removeEventListener("keydown", closeModalByEsc);
    };
  }, [modalRoot, handleCloseModal]);

  return createPortal(
    <>
      {<><div className={`${modalStyles.main} pt-15 pr-10 pl-10 pb-15`}>
        <div className={modalStyles.header}>
          {title && (
            <h2 className={`${modalStyles.title} text text_type_main-large`}>
              {title}
            </h2>
          )}
          <button
            onClick={handleCloseModal}
            className={modalStyles.closeButton}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {body}
      </div>
      <ModalOverlay handleClose={handleCloseModal} /></>}
    </>,
    modalRoot
  );
};

export default Modal;