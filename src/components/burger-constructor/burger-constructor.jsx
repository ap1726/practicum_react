import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon,CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = (props) => {
  return (
    <section className={styles.main+' mt-10'}>
      <ConstructorElement 
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            /*thumbnail={img}*/ extraClass={styles.items+' mb-3 ml-10'} />
      <ul className={styles.with_scroll}>
        <li className={styles.items+' mb-3'}>
        <DragIcon type="primary" />
        <ConstructorElement 
            text="Краторная булка N-200i (верх)"
            price={50}
            /*thumbnail={img}*/ extraClass={'ml-3'} />
        </li>
        <li className={styles.items+' mb-3'}>
        <DragIcon type="primary"/>
        <ConstructorElement 
            text="Краторная булка N-200i (верх)"
            price={50}
            /*thumbnail={img}*/ extraClass={'ml-3'}/>
        </li>
        <li className={styles.items+' mb-3'}>
        <DragIcon type="primary" />
        <ConstructorElement 
            text="Краторная булка N-200i (верх)"
            price={50}
            /*thumbnail={img}*/ extraClass={'ml-3'} />
        </li>
      </ul>
      <div className={styles.items+' mb-3 ml-6'}><ConstructorElement 
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            /*thumbnail={img}*/ extraClass={styles.items+' mb-3 ml-4'} /></div>
      <div>
          <div className={styles.price_sum}>{610}<CurrencyIcon type="primary" /></div>
          <Button htmlType="button" type="primary" size="medium" extraClass={styles.inline}>
            Оформить заказ
          </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
