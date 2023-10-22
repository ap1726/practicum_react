import { FC } from "react";
import styles from "./ingredient-image.module.css";

export interface IData {
  image: string,
  alt: string,
  hide?: boolean,
}

const IngredientImage: FC<IData> = ({ image, alt, hide=false }) => {
  return (
    <div className={hide ? (`${styles.content} ${styles.hide}`) : (`${styles.content}`)}>
      <div className={styles.item}>
        <img className={styles.image} src={image} alt={alt} />
      </div>
    </div>
  );
};

export default IngredientImage;
