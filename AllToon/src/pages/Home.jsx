import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import WebtoonList from "../components/WebtoonList";
import MainBanner from "../components/MainBanner";
import { DayDispatchContext, DayStateContext } from "../App";
import { SectionWebtoons } from "../styled/commonStyle";

const webtoon_nav = ["신작", "월", "화", "수", "목", "금", "토", "일", "무료"];
const dayMap = {
  신작: "NEW",
  월: "MON",
  화: "TUE",
  수: "WED",
  목: "THU",
  금: "FRI",
  토: "SAT",
  일: "SUN",
  무료: "FREE",
};

const FlexUlWrapper = styled.ul`
  display: flex;
  width: 100%;
  > li {
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #fff;
    opacity: 0.5;
    &.active {
      opacity: 1;
      font-weight: 700;
    }
    > a {
      display: block;
      padding: 20px 16px;
    }
  }
`;
const NavDays = styled.nav`
  position: sticky;
  ${({ top }) => top && `top: ${top}px;`}
  z-index: 10;
  background: #000;
`;

const Home = ({ webtoons, headerHeight }) => {
  const { today, mainBanner } = useContext(DayStateContext);
  const dispatch = useContext(DayDispatchContext);
  const [activeDay, setActiveDay] = useState(today);

  useEffect(() => {
    setActiveDay(today);
  }, [today]);

  const onClickChangeDay = (day) => {
    const newDay = dayMap[day] || "MON"; // 매핑 객체 사용
    if (today !== newDay) {
      dispatch({ type: "SET_TODAY", payload: newDay });
      setActiveDay(newDay);
    }
  };

  return (
    <div className="Home">
      <MainBanner mainBanner={mainBanner} />
      <NavDays style={{ top: headerHeight }}>
        <FlexUlWrapper>
          {webtoon_nav.map((item) => {
            const englishDay = dayMap[item];
            const isActive = activeDay === englishDay ? "active" : null;
            return (
              <li key={item} className={isActive} onClick={() => onClickChangeDay(item)}>
                <a href="#">{item}</a>
              </li>
            );
          })}
        </FlexUlWrapper>
      </NavDays>
      <SectionWebtoons>
        {webtoons.map((webtoon) => {
          return <WebtoonList key={webtoon.id} webtoon={webtoon} />;
        })}
      </SectionWebtoons>
    </div>
  );
};
export default Home;
