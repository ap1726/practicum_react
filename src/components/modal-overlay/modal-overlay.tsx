import styles from "./modal-overlay.module.css";

const ModalOverlay = ( handleClose: () => void ) => {
  function handleCloseOverlay(){
    handleClose();
  }
  return (
    <div className={styles.modalOverlay} onClick={handleCloseOverlay}></div>
  );
};

export default ModalOverlay;