import React from "react";
import Item from "./components/Item/Item";
import { ItemProvider } from "./components/Item/ItemData";
import { ItemState } from "./components/Item/ItemData";
import { sortByBudget } from "./utils/sort-with-budget";
import mockItems from "./data/mock/items";
// import "./App.css";

interface UserState {
  votes: number;
  diss: number;
}
interface PartyState {
  remaining: 420;
}

const UserContext = React.createContext({
  votes: 5,
  diss: 3,
});
export const useUserContext = () => React.useContext(UserContext);
export const UserContextProvider: React.FC = ({ children }) => {
  const value = React.useState({
    votes: 5,
    diss: 3,
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function App() {
  const [_items, setItems] = React.useState(mockItems);

  const AeonVotes = _items.reduce(
    (a, c) => {
      const upd = c.score.upd.filter((user) => user === "aeon").length;
      const dissd = c.score.dissd.filter((user) => user === "aeon").length;
      a.votes = a.votes + upd;
      a.diss = a.diss + dissd;
      return a;
    },
    {
      votes: 0,
      diss: 0,
    }
  );

  const updateItem = (item: ItemState, total: number) => {
    let inx = _items.findIndex(({ id }) => id === item.id);
    let itm = _items[inx];
    itm = {
      ...item,
      score: {
        ...item.score,
        total: () => total,
      },
    };

    _items[inx] = itm;
    setItems([..._items]);
    // ?.score.total = total;
  };

  const { items, budget } = sortByBudget(_items, 420);
  return (
    <div className="App">
      <h3>The Party has </h3>
      <h1>$420 to spend.</h1>

      <header className="App-header">
        <ul className="list">
          {items.map((item, i) => {
            let total =
              typeof item.score.total === "function"
                ? item.score.total()
                : item.score.total();

            return (
              <ItemProvider key={`${item.id}-${total}`} initialState={item}>
                <>
                  <Item
                    votes={AeonVotes}
                    top={item?.selected}
                    // bottom={i > _items.length - 3}
                    updateItem={updateItem}
                    intialState={item}
                  />
                </>
              </ItemProvider>
            );
          })}
        </ul>
        <h3>The Party has </h3>
        <h1>${budget} remaining.</h1>
        <h3>you have</h3>
        <h2>{5 - AeonVotes.votes} votes remaining</h2>
        <h2>{3 - AeonVotes.diss} diss' remaining</h2>
      </header>
    </div>
  );
}

export default App;
