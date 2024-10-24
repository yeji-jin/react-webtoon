// import { Styled } from "styled-components";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;
const LoadingContents = styled.div`
  display: flex;
  gap: 12px;
  span {
    display: inline-flex;
    width: 18px;
    height: 18px;
    background: #ffb682;
    border-radius: 50%;
    animation: ani_loading 0.5s ease-in infinite;
  }
  span:nth-child(2) {
    animation-delay: 0.1s;
  }
  span:last-child {
    animation-delay: 0.2s;
  }

  @keyframes ani_loading {
    0% {
      transform: translate(0, 0);
    }
    0% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;
const LoadingText = styled.p`
  margin-top: 30px;
  font-size: 17px;
  font-weight: 700;
`;

const Loading = () => {
  return (
    <>
      <LoadingContainer>
        <LoadingContents>
          <span></span>
          <span></span>
          <span></span>
        </LoadingContents>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    </>
  );
};
export default Loading;
