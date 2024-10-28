import { createContext, useReducer, ReactNode, Dispatch } from 'react';

export enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
  REMOVE_ALL = 'removeAll',
}

interface Nutrition {
  calories: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
}

export interface Fruit {
  name: string;
  id: number;
  family: string;
  order: string;
  genus: string;
  nutritions: Nutrition;
}

interface State {
  fruits: Fruit[];
}

interface AddFruitAction {
  type: ActionType.ADD;
  payload: Fruit[];
}

interface RemoveFruitAction {
  type: ActionType.REMOVE;
  payload: number;
}

interface RemoveAllFruitAction {
  type: ActionType.REMOVE_ALL;
}

// Combine them into a union type
type Action = AddFruitAction | RemoveFruitAction | RemoveAllFruitAction;

interface FruitsContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const initialState: State = {
  fruits: [],
};

export const FruitsListContext = createContext<FruitsContextType>({
  state: initialState,
  dispatch: () => {},
});

// reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD:
      return { ...state, fruits: [...state.fruits, ...action.payload] };
    case ActionType.REMOVE:
      const fruits = state.fruits.filter(
        (fruit, index) => index !== action.payload
      );
      return { ...state, fruits };
    case ActionType.REMOVE_ALL:
      return initialState;
    default:
      return state;
  }
};

// provider
export const FruitsListReducerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FruitsListContext.Provider value={{ state, dispatch }}>
      {children}
    </FruitsListContext.Provider>
  );
};
