import styled from "styled-components";

const StyledFooter = styled.footer.attrs((props) => ({
  style: {
    position: props.$position,
  },
}))`
  left: 50%;
  bottom: 0;
  padding: 40px;
  width: 100%;
  max-width: 640px;
  transform: translateX(-50%);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
const Footer = ({ $position }) => {
  return (
    <StyledFooter $position={$position}>
      <p>제작자 : 진예지</p>
    </StyledFooter>
  );
};
export default Footer;
