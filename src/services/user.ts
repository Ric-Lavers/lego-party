import Axios from "./Axios";
import { IUser } from "../types";

export const getUser = (id: string): Promise<IUser> => {
  return Axios.get(`user/${id}`);
};

export const createUser = (user: IUser): Promise<IUser> => {
  return Axios.post("user/create", user);
};
