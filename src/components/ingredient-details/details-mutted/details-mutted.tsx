import styles from "./details-mutted.module.css";
import { FC } from 'react';

interface IDetailsType {
  title: string,
  value: string,
  extraClass: string
}

const DetailsMutted: FC<IDetailsType> = ({title, value, extraClass}) => {

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

export default DetailsMutted;