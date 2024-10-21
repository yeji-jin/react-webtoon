import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  padding: 24px;
  > ul {
    margin-top: 40px;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  > button {
    width: 32px;
    height: 32px;
    background: #fff;
    border-radius: 50%;
    border: 0;
  }
`;
const MenuItem = styled.li`
  position: relative;
  display: flex;
  gap: 8px;
  padding: 30px 16px;
  & + & {
    border-top: 1px solid #efefef;
  }
  i {
    display: inline-flex;
    width: 24px;
    height: 24px;
  }
  span {
    font-size: 18px;
  }
  &::after {
    content: ">";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    font-size: 24px;
    font-weight: 700;
  }
`;

const MenuList = [
  {
    icon: "⭐️",
    title: "메뉴 타이틀",
    url: "/",
  },
  {
    icon: "⭐️",
    title: "메뉴 타이틀",
    url: "/",
  },
  {
    icon: "⭐️",
    title: "메뉴 타이틀",
    url: "/",
  },
  {
    icon: "⭐️",
    title: "메뉴 타이틀",
    url: "/",
  },
  {
    icon: "⭐️",
    title: "메뉴 타이틀",
    url: "/",
  },
  {
    icon: "⭐️",
    title: "메뉴 타이틀",
    url: "/",
  },
  {
    icon: "⭐️",
    title: "메뉴 타이틀",
    url: "/",
  },
  {
    icon: "⭐️",
    title: "메뉴 타이틀",
    url: "/",
  },
];

const Menu = () => {
  return (
    <MenuContainer>
      <UserInfo>
        락기락기님, 어서오세요.
        <button>ℹ️</button>
      </UserInfo>
      <ul>
        {MenuList.map((item, index) => {
          return (
            <MenuItem key={index}>
              <Link to={item.url}>
                <i>{item.icon}</i>
                <span>{item.title}</span>
              </Link>
            </MenuItem>
          );
        })}
      </ul>
    </MenuContainer>
  );
};
export default Menu;
