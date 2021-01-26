import React from "react";

import * as S from "./Item.style";
import Item from "./Item";
import { ItemProvider } from "./ItemData";

// import { ItemProvider } from "./Item";
// import Dissd from "./templates/Dissd";
// import High from "./templates/High";
// import Untouched from "./templates/Untouched";
// import Upd from "./templates/Upd";

const ItemSwitch = () => {
  return (
    <ItemProvider>
      <Item />
    </ItemProvider>
  );
  return (
    <div className="list">
      <div className="item">
        <S.Container>
          <S.UpButton>+</S.UpButton>
          <S.DownButton>-</S.DownButton>
          <img
            style={{ width: "25%" }}
            src="https://purr.objects-us-east-1.dream.io/i/usdDz.jpg"
            alt="cat"
          />
        </S.Container>
        <p>High fifty</p>
        <p>$50</p>
      </div>
    </div>
  );
  return (
    <ItemProvider>
      <div classNameName="make styled components">
        <Dissd />
        <High />
        <Untouched />
        <Upd />
      </div>
    </ItemProvider>
  );
};

export default ItemSwitch;
