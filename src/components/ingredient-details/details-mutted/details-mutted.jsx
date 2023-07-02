import styles from "./details-mutted.module.css";
import PropTypes from 'prop-types';

const DetailsMutted = ({title, value, extraClass}) => {

  return (
    <div className={`${styles.detailsItem}`+extraClass}>
        <span className='text text_type_main-small text_color_inactive'>
            {title}
        </span>
        <span className={`text text_type_digits-default text_color_inactive ${styles.titleCenter}`} >
            {value}
        </span>
    </div>
  );
};

DetailsMutted.propTypes = {
  title:PropTypes.string,
 value:PropTypes.number,
 extraClass:PropTypes.string,
}; 
 

export default DetailsMutted;