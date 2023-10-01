import styles from "./modal-overlay.module.css";
import {FC} from 'react'

interface state {
  handleClose: Function
}

const ModalOverlay:FC<state> = ( {handleClose} ) => {
  function handleCloseOverlay(){
    handleClose();
  }
  return (
    <div className={styles.modalOverlay} onClick={handleCloseOverlay}></div>
  );
};

export default ModalOverlay;