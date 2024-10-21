import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { WebtoonDispatchContext, WebtoonStateContext, DayStateContext } from "../App";

const WebtoonListItem = styled.li`
  overflow: hidden;
  position: relative;
  padding-top: 150%;
  border-radius: 4px;
`;
const WebtoonBedgeContianer = styled.div`
  position: absolute;
  top: 2%;
  left: 2%;
  display: flex;
  gap: 2px;
  z-index: 1;
`;
const WebtoonBedge = styled.span`
  padding: 2px 4px;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  background: yellow;
`;
const WebtoonImageBox = styled.span`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const IconPick = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 24px;
  height: 24px;
  background-color: ${(props) => (props.$picked ? "red" : "transparent")};
  border: 1px solid #fff;
  z-index: 5;
  cursor: pointer;
`;

const WebtoonList = ({ webtoon, isPickHidden = false }) => {
  const dispatch = useContext(WebtoonDispatchContext);
  const myPicks = useContext(WebtoonStateContext);
  const isPicked = myPicks.some((item) => item.id === webtoon.id);
  const [myPick, setMypick] = useState(isPicked || false);

  // const { history } = useContext(DayStateContext);

  const onClickMyPick = () => {
    setMypick(!myPick);
    dispatch({ type: "TOGGLE_PICK", payload: { ...webtoon, isPicked: myPick } });
  };

  const saveHistory = (webtoon) => {
    console.log("webtoon", webtoon);
    dispatch({ type: "SET_HISTORY", payload: { ...webtoon } });
  };

  return (
    <WebtoonListItem
      onClick={() => {
        saveHistory(webtoon);
      }}
    >
      <a href={webtoon.url}>
        <WebtoonBedgeContianer>
          {webtoon.isEnd && <WebtoonBedge>완결</WebtoonBedge>}
          {!webtoon.isEnd && <WebtoonBedge>연재중</WebtoonBedge>}
          {webtoon.isFree && <WebtoonBedge>무료</WebtoonBedge>}
          {webtoon.isUpdated && <WebtoonBedge>UP</WebtoonBedge>}
        </WebtoonBedgeContianer>
        <WebtoonImageBox>
          <img src={webtoon.thumbnail[0]} alt={webtoon.title} />
        </WebtoonImageBox>
      </a>
      {!isPickHidden && <IconPick onClick={() => onClickMyPick()} $picked={isPicked} />}
    </WebtoonListItem>
  );
};
export default WebtoonList;
