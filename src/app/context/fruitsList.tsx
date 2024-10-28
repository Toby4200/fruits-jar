import { createContext, useReducer, ReactNode, Dispatch } from 'react';

export enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
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
  payload: Fruit;
}

interface RemoveFruitAction {
  type: ActionType.REMOVE;
  payload: number;
}

// Combine them into a union type
type Action = AddFruitAction | RemoveFruitAction;

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
      return { ...state, fruits: [...state.fruits, action.payload] };
    case ActionType.REMOVE:
      const fruits = state.fruits.filter(
        (fruit, index) => index !== action.payload
      );
      return { ...state, fruits };
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
