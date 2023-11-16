import { orderReducer } from './order';
import { 
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAILED
} from '../actions/actions';

describe('orderReducer', () => {
  const initialState = {
    order: 0,
    orderRequest: false,
    orderFailed: false
  };

  it('should handle CREATE_ORDER_SUCCESS', () => {
    const item = 1;
    const action = {
      type: CREATE_ORDER_SUCCESS,
      item
    };
    const expectedState = {
      ...initialState,
      orderRequest: false,
      order: item
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_ORDER_REQUEST', () => {
    const action = {
      type: CREATE_ORDER_REQUEST
    };
    const expectedState = {
      ...initialState,
      orderRequest: true,
      orderFailed: false
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_ORDER_FAILED', () => {
    const action = {
      type: CREATE_ORDER_FAILED
    };
    const expectedState = {
      ...initialState,
      orderRequest: false,
      orderFailed: true
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });
});