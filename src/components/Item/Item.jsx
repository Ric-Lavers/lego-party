import React from "react";
import { useItemContext } from "./ItemData";

const Item: React.FC = ({
  votes: { votes, diss },
  top,
  bottom,
  intialState = {},
  updateItem,
}: any) => {
  // const [itemBGClass, setItemClass] = React.useState("item-bg");
  const [item] = useItemContext(intialState);
  const { id, down, up, score, price, title } = item;
  const usersScores = {
    upd: score.upd.filter((str) => str === "aeon").length,
    dissd: score.dissd.filter((str) => str === "aeon").length,
  };

  const isUpdActive = usersScores.upd > 0;
  const isDownActive = usersScores.dissd > 0;
  React.useEffect(() => {
    !!updateItem && updateItem(item, score.total());
  }, [score.total(), id]);

  // const handlePointerEnter = () => setItemClass("item-bg selected");
  // const handlePointerLeave = () => setItemClass("item-bg");

  const handleUpClick = (e) => {
    (votes < 5 || isDownActive) && up(e);
  };

  return (
    <div className="item-bg">
      <a onClick={(e) => e.preventDefault()} href="#">
        <li
          className="item"
          style={{
            backgroundColor: top
              ? "var(--light-grey)"
              : bottom
              ? "var(--pink)"
              : "inherit",
          }}
        >
          <button
            onClick={handleUpClick}
            data-amount="2"
            className={`up-btn ${isUpdActive && "active"}`}
          >
            {(isUpdActive ? usersScores.upd : "") + "+"}
          </button>
          <span data-total="6" className="total">
            {score.total()}
          </span>

          <img src={`https://picsum.photos/id/${id * 3}/300/200`} alt="cat" />
          <h3>{title}</h3>
          <p>${price}</p>
          <button
            className={`down-btn ${isDownActive && "active"}`}
            onClick={(e) => (diss < 3 || isUpdActive) && down(e)}
            data-amount="0"
          >
            {usersScores.dissd > 0 ? `-${usersScores.dissd}` : "-"}
          </button>
        </li>
      </a>
    </div>
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
