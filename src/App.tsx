import React, { useEffect } from "react";
import isEqual from "lodash.isequal";
import { useSetState } from "react-use";
import Item from "./components/Item/Item";
// import { ItemProvider } from "./components/Item/ItemData";
// import { ItemState } from "./components/Item/ItemData";
import UserForm from "./components/UserForm/UserForm";
import { sortByBudget } from "./utils/sort-with-budget";
import { getAllItems, updateItemScore } from "./services/budgetItems";
import { IItem, IScore, Dir } from "./types";
import useUserData, { getUserId } from "./hooks/useUserData";

// import "./style/App.css";

interface UserState {
  votes: number;
  diss: number;
}
interface PartyState {
  remaining: 420;
}

interface ItemData {
  items: IItem[];
  loading: boolean;
  error: boolean;
}
interface IuseitemData extends ItemData {
  updateItemScores: (id: Pick<IItem, "_id">, score: IScore) => any;
  updateScoreByOne: any;
}
const useItemData = (): IuseitemData => {
  const [{ items, loading, error }, setItems] = useSetState<ItemData>({
    items: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const data = await getAllItems();
        setItems({ items: data, loading: false });
      } catch (error) {
        setItems({ error, loading: false });
      }
    };
    fetchAllItems();
  }, []);

  const updateItemScores = async (id: Pick<IItem, "_id">, score: IScore) => {
    const item = items.find(
      (itm) => ((itm._id as unknown) as Pick<IItem, "_id">) === id
    ) as IItem;
    if (isEqual(item.score, score)) return Promise.resolve();
    try {
      await updateItemScore(id, score);
      setItems((prev) => {
        const item = prev?.items.find(
          (itm) => ((itm._id as unknown) as Pick<IItem, "_id">) === id
        ) as IItem;
        item.score = score;
        return { ...prev };
      });
    } catch (error) {
      console.log("didn't update");
    }
  };

  const updateScoreByOne = (
    id: Pick<IItem, "_id">,
    type: Dir,
    direction: 1 | -1
  ) => {
    setItems((prev) => {
      const item = prev?.items.find(
        (itm) => ((itm._id as unknown) as Pick<IItem, "_id">) === id
      ) as IItem;
      //@ts-ignore
      item.score[type] = item.score[type] + 1 * direction;
      return { ...prev };
    });
  };

  return { items, loading, error, updateItemScores, updateScoreByOne };
};

function App() {
  const {
    items: itemsList,
    loading,
    error,
    updateItemScores,
    // updateScoreByOne,
  } = useItemData();
  const {
    loading: userLoading,
    createUser,
    userId,
    user,
    updateScoreByOne,
  } = useUserData(itemsList);
  console.log(itemsList);

  const { items, budget } = sortByBudget(itemsList, 420);

  console.log({ items });
  if (loading || userLoading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div className="App">
      <UserForm loading={userLoading} user={user} createUser={createUser} />
      <h3>The Party has </h3>
      <h1>$420 to spend.</h1>
      <section>
        {userId && (
          <div className="vote-info sticky">
            <h3>You have</h3>
            <h2>{5 - user.votes.upd} votes remaining</h2>
            <h2>{3 - user.votes.dissd} diss' remaining</h2>
          </div>
        )}

        <ul className="list">
          {items.map((item, i) => {
            return (
              <Item
                index={i}
                updateItemScores={updateItemScores}
                {...item}
                userVotes={user.votes}
                updateScoreByOne={updateScoreByOne}
                userId={userId}
              />
            );
          })}
        </ul>
      </section>
      <h3>The Party has </h3>
      <h1>${budget} remaining.</h1>
    </div>
  );
}

export default App;
