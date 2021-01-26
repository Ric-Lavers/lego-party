//@ts-nocheck
import React from "react";
import { useSetState } from "react-use";

// Utilities
function score({ upd = [], dissd = [] }): Score {
  function total(): number {
    //@ts-ignore
    return this.upd.length - this.dissd.length;
  }

  return {
    total,
    upd,
    dissd,
  };
}

//types
interface Score {
  total: () => number;
  upd: string[];
  dissd: string[];
}
export interface ItemState {
  up: Function;
  down: Function;

  selected: boolean;
  price: number;
  title: string;
  score: Score;
  selected?: boolean;
}
type UseItemData = (intialState?: Partial<ItemState>) => ItemState;

// hooks
const useItemState: UseItemData = (intialState = {}) => {
  const [state, setState] = useSetState({
    up: () => {},
    down: () => {},
    selected: false,
    price: 10,
    title: "Starting state",
    // score: score( ["string"],["string"]),
    score: {
      upd: [],
      dissd: [],
      ...intialState.score,
    },
    ...intialState,
  });

  const total = () => state.score.upd.length - state.score.dissd.length;
  const up = (e) => {
    e.preventDefault();
    let idx = state.score.dissd.indexOf("aeon");
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
        upd: [...state.score.upd, "aeon"],
      },
    });
  };
  const down = (e) => {
    e.preventDefault();
    let idx = state.score.upd.indexOf("aeon");
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
        dissd: [...state.score.dissd, "aeon"],
      },
    });
    // setState((prev) => {
    //   let idx = prev.score.upd.indexOf("aeon");
    //   if (idx !== -1) prev.upd.dissd.splice(idx, 1);
    //   console.log(idx);

    //   return {
    //     score: {
    //       ...state.score,
    //     upd: [...state.score.upd, "aeon"],
    //     },
    //   };
    // });
  };

  state.up = up;
  state.down = down;
  state.score.total = total;
  return [state, setState];
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
