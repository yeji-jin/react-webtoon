import styled from "styled-components";
import WebtoonList from "../components/WebtoonList";
import { SectionWebtoons, Message } from "../styled/commonStyle";

const TabRecent = ({ history }) => {
  console.log("history", history);
  return (
    <>
      {history.length > 0 ? (
        <SectionWebtoons>
          {history.map((webtoon) => {
            return <WebtoonList key={webtoon.id} webtoon={webtoon} isPickHidden={true} />;
          })}
        </SectionWebtoons>
      ) : (
        <Message>최근 감상한 작품이 없습니다.</Message>
      )}
    </>
  );
};
export default TabRecent;
