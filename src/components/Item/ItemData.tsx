import React from "react";
import { useSetState } from "react-use";
import { getUserId } from "../../hooks/useUserData";
import { IScore } from "../../types";

//types
export interface ItemState {
  price: number;
  title: string;
  score: IScore;
  selected?: boolean;
}
type UseItemData = (intialState?: Partial<IScore>) => any;

// hooks
const useItemScore: UseItemData = (
  initialScore = {
    upd: [],
    dissd: [],
  }
) => {
  const userId = getUserId();
  const [state, setState] = useSetState(initialScore);

  const up = (e) => {
    e.preventDefault();
    let idx = state.score.dissd.indexOf(userId);
    if (idx !== -1) {
      state.score.dissd.splice(idx, 1);
      return setState({
        score: {
          ...state.score,
        },
      });
    }

    setState({
      score: {
        ...state.score,
        upd: [...state.score.upd, userId],
      },
    });
  };

  const down = (e) => {
    e.preventDefault();
    let idx = state.score.upd.indexOf(userId);
    if (idx !== -1) {
      state.score.upd.splice(idx, 1);
      return setState({
        score: {
          ...state.score,
        },
      });
    }

    setState({
      score: {
        ...state.score,
        dissd: [...state.score.dissd, userId],
      },
    });
  };

  return [{ ...state, up, down }, setState];
};

//context
const ItemContext = React.createContext({});
export const useItemContext = () => {
  const value = React.useContext(ItemContext);
  return value;
};

export const ItemProvider = ({ initialState, children }) => {
  const value = useItemState(initialState || {});

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};
