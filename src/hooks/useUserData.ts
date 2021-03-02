import { useState, useEffect } from "react";
import { useSetState } from "react-use";
import { createUser, getUser } from "../services/user";
import { IUser, IItem } from "../types";

interface UserData {
  user: IUser;
  loading: boolean;
  error: boolean;
}
export enum Dir {
  UP = "upd",
  DOWN = "dissd",
}
export interface IUseUserData extends UserData {
  createUser: (userData: IUser) => void;
  userId?: string;
  updateScoreByOne: any;
}
export const getUserId = (): undefined | string =>
  JSON.parse(localStorage?.user || "{}")?._id;

const useUserData = (itemsList: IItem[]): IUseUserData => {
  const userId = getUserId();
  const [{ user, loading, error }, setUser] = useSetState<UserData>({
    user: {
      _id: undefined,
      name: "",
      number: "",
      votes: {
        items: [],
        upd: 0,
        dissd: 0,
      },
    },
    loading: false,
    error: false,
  });

  useEffect(() => {
    if (userId) {
      // const fetchUser = async () => {
      //   try {
      //     const newUser = await getUser(userId);
      //     // setUser({ user: { ...user, ...newUser }, loading: false });
      //   } catch (error) {
      //     setUser({ error, loading: false });
      //   }
      // };
      // fetchUser();
    } else {
      setUser({ loading: false });
    }
  }, []);

  const makeUser = async (userData: IUser) => {
    try {
      setUser({ loading: true });
      const user = await createUser(userData);
      localStorage.setItem("user", JSON.stringify(user));
      setUser({ user, loading: false });
    } catch (error) {
      setUser({ error, loading: false });
    }
  };

  // const [userVotes, setUserVotes] = useState<IUserVotes>(
  //   getUserVotes(userId, itemsList)
  // );

  const updateScoreByOne = (item_id: string, type: Dir, direction: 1 | -1) => {
    console.log("updateScoreByOne", { user, item_id, type, direction });

    const index = user.votes.items.findIndex(({ _id }) => _id == item_id);

    if (user.votes.upd < 5 && user.votes.dissd < 3) {
      console.log(type, direction);
      user.votes[type] = user.votes[type] + 1;
      user.votes.items.push({
        _id: item_id,
        total: 1,
        upd: 0,
        dissd: 0,
        [type]: 1,
      });
      setUser({ user });
    }
    // if (index !== -1) {

    //   //@ts-ignore
    //   // user.votes.items[index][type] =
    //   //@ts-ignore
    //   // user.votes.items[index][type] + 1 * direction;
    //   //@ts-ignore
    //   // user.votes.total = user.votes.total + 1 * direction;
    //   console.log(user.votes);

    //   setUser({ user });
    // }
  };
  return {
    user,
    loading,
    error,
    createUser: makeUser,
    userId,
    updateScoreByOne,
  };
};
export default useUserData;
