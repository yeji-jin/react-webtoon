import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  font-size: 22px;
  border: 0;
  color: #fff;
  background: transparent;
  cursor: pointer;
`;

const Button = ({ text, type = "default", onClick }) => {
  return (
    <>
      <StyledButton className={`Button Button_${type}`} onClick={onClick}>
        {text}
      </StyledButton>
    </>
  );
};
export default Button;
