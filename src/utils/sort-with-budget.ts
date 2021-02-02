import { IItem } from "../types";

type SortByBudget = (
  items: IItem[],
  budget: number
) => {
  budget: number;
  items: IItem[];
};
export const sortByBudget: SortByBudget = (items, budget) => {
  const sortedItems = items
    .sort((a, b) => b.score.total - a.score.total)
    .map((c) => {
      let selected = c.score.total > 0 && c.price <= budget;
      if (selected) {
        budget = budget - c.price;
      }

      return { ...c, selected };
    });
  return {
    budget,
    items: sortedItems,
  };
};
