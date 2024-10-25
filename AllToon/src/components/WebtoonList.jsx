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
  border-radius: 2px;
  color: ${(props) => (props.$background ? "#fff" : "#000")};
  background: ${(props) => props.$background || "#ffd200"};
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border: 0;
  background: #fff;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 5;
  cursor: pointer;
  > svg {
    width: 24px;
    fill: ${(props) => (props.$picked ? "red" : "rgba(34,34,34,0.8)")};
  }
`;

const WebtoonList = ({ webtoon, isPickHidden = false }) => {
  const dispatch = useContext(WebtoonDispatchContext);
  const myPicks = useContext(WebtoonStateContext);
  const isPicked = myPicks.some((item) => item.id === webtoon.id);
  const [myPick, setMypick] = useState(isPicked || false);

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
          {webtoon.isFree && <WebtoonBedge $background={"#38564f"}>무료</WebtoonBedge>}
          {webtoon.isUpdated && <WebtoonBedge $background={"#ff3042"}>UP</WebtoonBedge>}
        </WebtoonBedgeContianer>
        <WebtoonImageBox>
          <img src={webtoon.thumbnail[0]} alt={webtoon.title} />
        </WebtoonImageBox>
      </a>
      {!isPickHidden && (
        <IconPick onClick={() => onClickMyPick()} $picked={isPicked}>
          <svg viewBox="-2 0 105 92" xmlns="http://www.w3.org/2000/svg">
            <path d="M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z"></path>
          </svg>
        </IconPick>
      )}
    </WebtoonListItem>
  );
};
export default WebtoonList;
