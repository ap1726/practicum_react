import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import { useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  CLOSE_MODAL,
  CLOSE_INGREDIENT_MODAL,
  CLOSE_ORDER_MODAL,
} from "../../services/actions/actions";
import { useNavigate } from "react-router-dom";

const Modal = ({ body, title = "" }) => {
  const modalRoot = document.getElementById("modals");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCloseModal =() => {
      dispatch({ type: CLOSE_INGREDIENT_MODAL });
      dispatch({ type: CLOSE_ORDER_MODAL });
      dispatch({ type: CLOSE_MODAL });
      navigate(-1);
  }


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

Modal.propTypes = {
  body: PropTypes.element,
  title: PropTypes.string,
};

export default Modal;