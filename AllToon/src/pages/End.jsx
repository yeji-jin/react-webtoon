import WebtoonList from "../components/WebtoonList";
import { SectionWebtoons, Message } from "../styled/commonStyle";

const End = ({ webtoons }) => {
  const endWebtoons = webtoons.filter((item) => item.isEnd === true);
  console.log("webtoons endend @@", endWebtoons);
  return (
    <>
      {endWebtoons.length > 0 ? (
        <SectionWebtoons>
          {endWebtoons.map((webtoon) => {
            return <WebtoonList key={webtoon.id} webtoon={webtoon} />;
          })}
        </SectionWebtoons>
      ) : (
        <Message>완결된 웹툰이 없습니다.</Message>
      )}
    </>
  );
};
export default End;
