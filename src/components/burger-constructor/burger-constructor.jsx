import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon,CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerConstructor = (props) => {

  return (
    <section className={styles.main+' mt-10'}>
      <ConstructorElement 
            type="top"
            isLocked={true}
            text={props.bun.name}
            price={props.bun.price}
            thumbnail={props.bun.image_mobile} extraClass={styles.items+' mb-3 ml-10'} />
      <div className={styles.with_scroll}>
        {
          props.ingredients.map((item)=> 
            <div key={'div'+item._id} className={styles.items+' mb-3'}>
              <DragIcon key={'DragIcon'+item._id} type="primary" />
              <ConstructorElement key={'ConstructorElement'+item._id} 
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile} extraClass={'ml-4'} />
            </div>)
        }
      </div>
      <div className={styles.items+' mb-3 ml-6'}><ConstructorElement 
            type="bottom"
            isLocked={true}
            text={props.bun.name}
            price={props.bun.price}
            thumbnail={props.bun.image_mobile} extraClass={styles.items+' mb-3 ml-4'} /></div>
      <div className={styles.footer_order}>
        <div className={styles.price_sum}>{610}<CurrencyIcon type="primary" /></div>
          <Button htmlType="button" type="primary" size="medium" extraClass={styles.inline}>
            Оформить заказ
          </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
