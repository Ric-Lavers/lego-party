import Axios from "./Axios";
import { IScore, IItem } from "../types";

export const getAllItems = (): Promise<IItem[]> => {
  return Axios.get("all");
};

export const updateItemScore = (
  id: Pick<IItem, "_id">,
  score: Partial<IScore>
) => {
  console.log(id, score);

  return Axios.post("update-score", {
    _id: id,
    score,
  });
};
