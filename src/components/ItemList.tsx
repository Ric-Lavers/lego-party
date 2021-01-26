import React from "react";

import { sortByBudget } from "../utils/sort-with-budget";

const ItemList = () => {
  return (
    <ul className="list">
      {sortByBudget(_items, 420).items.map((item, i) => {
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
  );
};

export default ItemList;
