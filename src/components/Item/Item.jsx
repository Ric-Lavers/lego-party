import React from "react";
import { Dir } from "../../hooks/useUserData";
import { IItem, IUserVotes } from "../../types";
import { suffixOf } from "../../utils/suffix-of";

interface ItemProps extends IItem {
  index: Number;
  userId: string | undefined;
  selected: boolean;
  updateScoreByOne: any;
  userVotes: IUserVotes;
}
const Item: React.FC<ItemProps> = ({
  index,
  updateItemScores,
  score: _score,
  price,
  title,
  selected,
  _id,
  userId,
  votes,
  diss,
  updateScoreByOne,
  userVotes: usersScores,
}: any) => {
  const [score, setScore] = React.useState(_score);
  // const [itemBGClass, setItemClass] = React.useState("item-bg");
  // const [item] = useItemContext(intialState);

  // const { id, down, up, score, price, title } = item;
  // const usersScores = React.useMemo(
  //   () => ({
  //     upd: score.upd.reduce((a, str) => (str === userId ? ++a : a), 0),
  //     dissd: score.dissd.reduce((a, str) => (str === userId ? ++a : a), 0),
  //   }),
  //   [score, userId]
  // );

  const isUpdActive = usersScores.votes > 0;
  const isDownActive = usersScores.diss > 0;
  // console.log(score);
  // console.log(usersScores);

  // const handlePointerEnter = () => setItemClass("item-bg selected");
  // const handlePointerLeave = () => setItemClass("item-bg");

  const handleUpClick = (e) => {
    updateScoreByOne(_id, Dir.UP, 1);
    return;
    if (usersScores.votes < 5 || isDownActive) {
      setScore((prev) => {
        if (isDownActive) {
          const index = prev.dissd.indexOf(userId);
          const copy = [...prev.dissd];
          copy.splice(index, 1);

          updateScoreByOne(_id, Dir.DOWN, -1);
          return { ...prev, dissd: copy };
        }
        updateScoreByOne(_id, Dir.UP, 1);
        return { ...prev, upd: [...prev.upd, userId] };
      });
    }
  };

  const handleDownClick = (e) => {
    updateScoreByOne(_id, Dir.DOWN, -1);
    return;
    if (usersScores.diss < 3 || isUpdActive) {
      setScore((prev) => {
        if (isUpdActive) {
          const index = prev.upd.indexOf(userId);
          const copy = [...prev.upd];
          copy.splice(index, 1);

          updateScoreByOne(_id, Dir.UP, -1);
          return { ...prev, upd: copy };
        }

        updateScoreByOne(_id, Dir.DOWN, 1);
        return { ...prev, dissd: [...prev.dissd, userId] };
      });
    }
  };
  const handleBlur = (t) => {
    updateItemScores(_id, score);
  };

  return (
    <span
      className="item-container"
      onBlur={() => handleBlur(title)}
      onClick={(e) => e.preventDefault()}
      href="#"
    >
      <li className="item">
        <button
          onClick={handleUpClick}
          data-amount="2"
          className={`up-btn ${isUpdActive && "active"}`}
        >
          <span>
            {" "}
            {(isUpdActive ? usersScores.votes.toString() : "") + "+"}
          </span>
        </button>
        <span className="rank">{suffixOf(index + 1)}</span>
        <span data-total="6" className="total">
          {score.total}
        </span>

        <img src={`https://picsum.photos/id/${35}/300/200`} alt="cat" />
        <div className="details">
          <h3>{title}</h3>
          <p>${price}</p>
        </div>
        <button
          className={`down-btn ${isDownActive && "active"}`}
          onClick={handleDownClick}
          data-amount="0"
        >
          <span>{usersScores.diss > 0 ? `-${usersScores.diss}` : "-"}</span>
        </button>
      </li>
    </span>
  );
  return (
    <div className="item-bg">
      <a href="#">
        <li className="item">
          <button data-amount="0" className="up-btn">
            +
          </button>
          <span data-total="13" className="total">
            13
          </span>
          <img
            src="https://purr.objects-us-east-1.dream.io/i/usdDz.jpg"
            alt="cat"
          />
          <h3>High fifty</h3>
          <p>$50</p>
          <button data-amount="0" className="down-btn">
            -
          </button>
        </li>
      </a>
    </div>
  );
};

export default Item;
