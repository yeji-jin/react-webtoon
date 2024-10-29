import styled from "styled-components";

const GiftCoinList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  font-size: 20px;
  font-weight: 700;
  & + & {
    border-top: 1px solid #fff;
  }
  .coin {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  > button {
    display: flex;
    width: 128px;
    padding: 12px 24px;
    justify-content: center;
    text-align: center;
    border-radius: 4px;
    background: #00c73c;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0;
    border: 0;
    color: #fff;
  }
`;

const GiftItem = ({ GiftList }) => {
  return (
    <>
      {GiftList.map((item, index) => {
        return (
          <GiftCoinList key={index}>
            <div className="coin">
              <span>🪙</span>
              <p>{item.coin}개</p>
            </div>
            <button>{item.price} 원</button>
          </GiftCoinList>
        );
      })}
    </>
  );
};
export default GiftItem;
