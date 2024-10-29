import styled from "styled-components";
import GiftItem from "../components/GiftItem";

const GiftList = [
  {
    price: "4,500",
    coin: 30,
  },
  {
    price: "9,000",
    coin: 65,
  },
  {
    price: "17,900",
    coin: 170,
  },
  {
    price: "50,000",
    coin: 700,
  },
  {
    price: "4,500",
    coin: 30,
  },
  {
    price: "9,000",
    coin: 65,
  },
  {
    price: "17,900",
    coin: 170,
  },
  {
    price: "50,000",
    coin: 700,
  },
  {
    price: "4,500",
    coin: 30,
  },
  {
    price: "9,000",
    coin: 65,
  },
  {
    price: "17,900",
    coin: 170,
  },
  {
    price: "50,000",
    coin: 700,
  },
];

const MyCoinInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 40px 24px;
  margin: 32px 0;
  color: #000;
  background: #fff;
  border-radius: 12px;
  h5 {
    font-size: 20px;
  }
`;
const SectionTitle = styled.h5`
  display: flex;
  margin-bottom: 24px;
  padding: 16px 0;
  font-size: 20px;
  font-weight: 700;
  color: #efefef;
`;

const Gift = () => {
  return (
    <>
      <MyCoinInfo>
        <h5>
          <span>🪙 </span>
          보유중인 코인
        </h5>
        <p>0 개</p>
      </MyCoinInfo>
      <SectionTitle>코인 충전하기</SectionTitle>
      <GiftItem GiftList={GiftList} />
    </>
  );
};
export default Gift;
