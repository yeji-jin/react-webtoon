import { useState, useEffect, memo, useRef, forwardRef, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGift } from "@fortawesome/free-solid-svg-icons";

const header_nav = [
  { id: 0, name: "보관함", path: "/mypick" },
  { id: 1, name: "시간표", path: "/" },
  { id: 2, name: "완결", path: "/end" },
];
const mypick_list = [
  {
    id: 0,
    title: "최근감상",
    path: "recent",
  },
  {
    id: 1,
    title: "찜한작품",
    path: "like",
  },
  {
    id: 2,
    title: "구매작품",
    path: "own",
  },
];

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 10;
  width: 100%;
  max-width: 640px;
  transform: translateX(-50%);
  background: #000;
`;
const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  > h1 {
    width: 100%;
    text-align: center;
    font-size: 40px;
    font-family: "NamumPenScript";
  }
`;
const FlexUlWrapper = styled.ul`
  display: flex;
  justify-content: center;
  width: 100%;
  > li {
    flex: ${({ $auto }) => ($auto ? "none" : 1)};
    text-align: center;
    font-size: ${({ fontSize }) => fontSize || "18"}px;
    font-weight: 400;
    color: #fff;
    opacity: 0.5;
    &.active {
      opacity: 1;
      font-weight: 700;
    }
    > a {
      display: block;
      padding: 20px 16px;
    }
  }
  .header_nav_item.active {
    border-bottom: 2px solid #fff;
  }
`;
const BtnsWrapper = styled.div`
  position: absolute;
  top: 50%;
  ${({ $position = "left" }) => $position}: 20px;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
`;

const Header = forwardRef((props, ref) => {
  const headerRef = ref;
  const navigate = useNavigate();
  const location = useLocation();
  const [currentNav, setCurrentNav] = useState(mypick_list[0].path);
  const ShowHeaderNav = !["/gift", "/search", "/menu"].includes(location.pathname);

  useEffect(() => {
    const storedNav = localStorage.getItem("currentNav");
    if (location.pathname.startsWith("/mypick")) {
      if (storedNav) {
        setCurrentNav(storedNav);
      } else {
        localStorage.setItem("currentNav", currentNav);
      }
      navigate(`/mypick/${currentNav}`);
    }
  }, [location.pathname]);
  const handleMypickClick = (path) => {
    navigate(`/mypick/${path}`);
    setCurrentNav(path);
    localStorage.setItem("currentNav", path);
  };

  return (
    <>
      <HeaderWrapper ref={headerRef}>
        {/* common */}
        <StyledHeader className="Header">
          <BtnsWrapper>
            {location.pathname === "/menu" && <Button text={"<"} onClick={() => navigate(-1)} />}
            <Button text={<FontAwesomeIcon icon={faGift} />} onClick={() => navigate("/gift")} />
          </BtnsWrapper>
          <h1>
            <Link to="/">AllToon</Link>
          </h1>
          <BtnsWrapper $position={"right"}>
            <Button text={<FontAwesomeIcon icon={faBars} />} onClick={() => navigate("/menu")} />
          </BtnsWrapper>
        </StyledHeader>
        {/* common nav */}
        {ShowHeaderNav && (
          <nav className="header_nav">
            <FlexUlWrapper>
              {header_nav.map((nav) => {
                return (
                  <li
                    key={nav.id}
                    className={`header_nav_item ${location.pathname === nav.path || (nav.path === "/mypick" && location.pathname.startsWith("/mypick/")) ? "active" : null}`}
                  >
                    <Link to={nav.path}>{nav.name}</Link>
                  </li>
                );
              })}
            </FlexUlWrapper>
          </nav>
        )}
        {/* mypick header */}
        {(location.pathname === "/mypick" || location.pathname.startsWith("/mypick/")) && (
          <FlexUlWrapper fontSize={16} $auto="true">
            {mypick_list.map((list) => (
              <li key={list.id} className={list.path === currentNav ? "active" : null}>
                <Link to={`/mypick/${list.path}`} onClick={() => handleMypickClick(list.path)}>
                  {list.title}
                </Link>
              </li>
            ))}
          </FlexUlWrapper>
        )}
      </HeaderWrapper>
    </>
  );
});
export default memo(Header);
