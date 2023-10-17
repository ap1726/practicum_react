import { ConstructorElement,DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useDrag, useDrop } from "react-dnd";
import { useRef, FC, Ref } from "react";
import { deleteIngredientFromOrder } from "../../../services/actions/order";

import { getSelectedIngredients } from "../../../utils/function_tools";

export interface itemType {
  uniqueId?: string,
  _id: string,
  name: string,
  price: number,
  image_mobile: string,
  index?: number,
  type?: string
}

type dataType = {
  item: itemType,
  index: number,
  moveListItem: Function
}

export const ConstructorItem: FC<dataType> = ({ item, index, moveListItem }) => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getSelectedIngredients);

  const handleDeleteIngredient = (index: number) => {
    dispatch(deleteIngredientFromOrder(ingredients, index));
  };

  const [, dragRef] = useDrag({
    type: "item",
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item: itemType, monitor: any) => {
      const dragIndex: number | undefined = item.index;
      const hoverIndex = index;
      const hoverBoundingRect: Ref<HTMLDivElement> | any =ref.current? ref.current.getBoundingClientRect() : null;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex === hoverIndex) return;
      if (dragIndex && dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex && dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const ref = useRef<HTMLDivElement>(null);
  const dragDropRef: Ref<HTMLDivElement> | any | null = dragRef(dropRef(ref));


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