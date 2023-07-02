import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import { useCallback, useEffect, useState } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const Modal = ({ body, title = "" }) => {
  const modalRoot = document.getElementById("modals");

  const [isVisible, setIsVisible] = useState(false);

  const handleCloseModal = useCallback(() => {
      setIsVisible(false);
  }, [])

  useEffect(()=>{setIsVisible(true)}, [])



  useEffect(() => {
    const closeModalByEsc = (e) => {
      e.key === "Escape" && handleCloseModal();
    };
    document.addEventListener("keydown", closeModalByEsc);

    return () => {
      document.removeEventListener("keydown", closeModalByEsc);
    };
  }, [modalRoot, handleCloseModal]);

  return createPortal(
    <>
      {isVisible && <><div className={`${modalStyles.container} pt-15 pr-10 pl-10 pb-15`}>
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

Modal.propTypes = {
  body: PropTypes.element,
  title: PropTypes.string,
};

export default Modal;