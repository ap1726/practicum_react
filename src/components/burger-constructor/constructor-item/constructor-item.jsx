import { ConstructorElement,DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { deleteIngredientFromOrder } from "../../../services/actions/order";

import { getSelectedIngredients } from "../../../utils/function_tools";

export const ConstructorItem = ({ item, index, moveListItem }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getSelectedIngredients);

  const handleDeleteIngredient = (index) => {
    dispatch(deleteIngredientFromOrder(ingredients, index));
  };

  const [, dragRef] = useDrag({
    type: "item",
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex === hoverIndex) return;
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));


    return (
        <div ref={dragDropRef} key={index}>
            <DragIcon key={'DragIcon'+item._id} type="primary" />
            <ConstructorElement 
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                extraClass={'ml-4'}
                handleClose={() => handleDeleteIngredient(index)}
            />
        </div>
        );
};