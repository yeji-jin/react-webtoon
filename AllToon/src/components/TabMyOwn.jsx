import WebtoonList from "./WebtoonList";
import { SectionWebtoons, Message, MessageUrl } from "../styled/commonStyle";
import { Link } from "react-router-dom";

const TabMyOwn = ({ OwnedList }) => {
  console.log(OwnedList);
  return (
    <>
      {OwnedList.length > 0 ? (
        <SectionWebtoons>
          {OwnedList.map((webtoon) => {
            return <WebtoonList key={webtoon.id} webtoon={webtoon} />;
          })}
        </SectionWebtoons>
      ) : (
        <>
          <Message>구매하신 작품이 없습니다.</Message>
          <MessageUrl>
            <Link to={"/gift"}>
              <span>🪙</span> 코인이 부족하다면?
            </Link>
          </MessageUrl>
        </>
      )}
    </>
  );
};
export default TabMyOwn;
