import styles from "./modal-overlay.module.css";

const ModalOverlay = (props) => {
  function handleCloseOverlay(){
    props.handleClose();
  }
  return (
    <div className={styles.modalOverlay} onClick={handleCloseOverlay}></div>
  );
};

export default ModalOverlay;