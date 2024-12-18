import styled from "styled-components";

export const SectionWebtoons = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  @media (max-width: 490px) {
    padding: 0 4px;
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const Message = styled.div`
  padding: 60px 0;
  text-align: center;
  font-size: 22px;
`;
export const MessageUrl = styled.div`
  padding: 60px 0;
  text-align: center;
  font-size: 16px;
  color: #eee;
  text-decoration: underline;
`;
