export interface IScore {
  total: number;
  upd: string[];
  dissd: string[];
}

export interface IItem {
  title: string;
  price: number;
  score: IScore;
  created_on: Date;
  _id: string;
  selected?: boolean;
  img: {
    src: string;
  };
}
export interface IVotesItems {
  _id: string;
  total: number;
  upd: number;
  dissd: number;
}
export interface IVotes {
  items: IVotesItems[];
  upd: number;
  dissd: number;
}
export interface IUser {
  _id?: string;
  name: string;
  number: string;
  votes: IVotes;
}
export interface IUserVotes {
  votes: number;
  diss: number;
}
