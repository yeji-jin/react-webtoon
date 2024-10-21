import { useOutletContext, useLocation } from "react-router-dom";
import WebtoonList from "./WebtoonList";
import { SectionWebtoons, Message } from "../styled/commonStyle";

const TabMyPick = () => {
  const { myPicks } = useOutletContext();
  return (
    <>
      {myPicks.length > 0 ? (
        <SectionWebtoons>
          {myPicks.map((webtoon) => {
            return <WebtoonList key={webtoon.id} webtoon={webtoon} />;
          })}
        </SectionWebtoons>
      ) : (
        <Message>찜한 작품이 없습니다.</Message>
      )}
    </>
  );
};
export default TabMyPick;
