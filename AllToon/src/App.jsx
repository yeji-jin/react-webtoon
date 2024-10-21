import { useState, useReducer, useEffect, useRef, createContext } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import End from "./pages/End";
import Gift from "./pages/Gift";
import Menu from "./pages/Menu";
import MyPage from "./pages/MyPage";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import TabRecent from "./components/TabRecent";
import TabMyPick from "./components/TabMyPick";
import TabMyOwn from "./components/TabMyOwn";
import Notfound from "./pages/Notfound";
import Footer from "./components/Footer";
import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const initialState = {
  isLoading: true,
  webtoons: [],
  // today: daysOfWeek[new Date().getDay()],
  today: null,
  myPicks: JSON.parse(localStorage.getItem("myPicks")) || [],
  mainBanner: [],
  history: JSON.parse(localStorage.getItem("myHistory")) || [],
  OwnedList: [],
  GiftList: [],
};
// 리듀서 함수
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_WEBTOONS":
      return { ...state, webtoons: action.payload };
    case "SET_HISTORY":
      const updatedHistory = state.history.some((item) => item.id === action.payload.id)
        ? state.history // 존재하면 history를 그대로 반환
        : [...state.history, action.payload]; // 존재하지 않으면 새 항목을 추가
      localStorage.setItem("myHistory", JSON.stringify(updatedHistory));
      return { ...state, history: updatedHistory };
    case "SET_TODAY":
      return { ...state, today: action.payload, webtoons: [], isLoading: true };
    case "SET_BANNER":
      return { ...state, mainBanner: action.payload };
    case "TOGGLE_PICK":
      const updatedPicks = state.myPicks.some((item) => item.id === action.payload.id) // myPicks 배열에 클릭한 웹툰의 id와 같은 id를 가진 항목이 있는지 확인하고 있어요. 결과는 true 또는 false로 반환됩니다.
        ? state.myPicks.filter((item) => item.id !== action.payload.id) // filter를 사용해 해당 id를 가진 웹툰을 배열에서 제거해요. 즉, 사용자가 이미 선택한 웹툰을 다시 클릭했을 때 그 웹툰을 선택 해제하는 거예요.
        : [...state.myPicks, action.payload]; //action.payload(클릭한 웹툰의 정보)를 기존의 myPicks 배열에 추가합니다. 이렇게 해서 사용자가 새로운 웹툰을 선택하게 됩니다

      // updatedPicks를 localStorage에 저장
      localStorage.setItem("myPicks", JSON.stringify(updatedPicks));
      return { ...state, myPicks: updatedPicks };
    default:
      return state;
  }
};

export const DayStateContext = createContext();
export const DayDispatchContext = createContext();
export const WebtoonStateContext = createContext();
export const WebtoonDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const appRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerPosition, setFooterPosition] = useState("relative");

  useEffect(() => {
    const currentDay = daysOfWeek[new Date().getDay()];
    let newToday;
    switch (location.pathname) {
      case "/end":
        newToday = "END";
        console.log("end");
        break;
      // case "/gift":
      //   newToday = "NEW";
      //   console.log("new");
      //   break;
      case "/":
        newToday = currentDay;
        console.log("main");
        break;
      default:
        console.log("main2");
        newToday = data.today;
        dispatch({ type: "SET_LOADING", payload: false });
    }
    if (data.today !== newToday) {
      dispatch({ type: "SET_TODAY", payload: newToday });
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchWebtoons = async () => {
      console.log("data.today", data.today);
      let url;
      if (data.today === "FREE") {
        url = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=NAVER&page=1&perPage=30&sort=ASC&isUpdated=true&isFree=true";
      } else if (data.today === "NEW") {
        url = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=NAVER&page=1&perPage=30&sort=ASC&isUpdated=true";
      } else if (data.today === "END") {
        url = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=NAVER&page=1&perPage=30&sort=ASC&isFree=false";
      } else {
        url = `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=NAVER&page=1&perPage=30&sort=ASC&updateDay=${data.today}`;
      }
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const response = await fetch(url);
        const json = await response.json();
        dispatch({ type: "SET_WEBTOONS", payload: json.webtoons });
        dispatch({ type: "SET_BANNER", payload: json.webtoons.slice(0, 7) });
      } catch (error) {
        console.error("Failed to fetch webtoons:", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    data.today && fetchWebtoons();
    // let url;
    // if (data.today === "FREE") {
    //   url = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=NAVER&page=1&perPage=30&sort=ASC&isUpdated=true&isFree=true";
    // } else if (data.today === "NEW") {
    //   url = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=NAVER&page=1&perPage=30&sort=ASC&isUpdated=true";
    // } else if (data.today === "END") {
    //   url = "https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=NAVER&page=1&perPage=30&sort=ASC&isFree=false";
    // } else {
    //   url = `https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?provider=NAVER&page=1&perPage=30&sort=ASC&updateDay=${data.today}`;
    // }
    // dispatch({ type: "SET_LOADING", payload: true });
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     const bannerList = json.webtoons.slice(0, 5);
    //     dispatch({ type: "SET_WEBTOONS", payload: json.webtoons });
    //     dispatch({ type: "SET_BANNER", payload: bannerList });
    //     dispatch({ type: "SET_LOADING", payload: false });
    //   });
  }, [data.today]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    const checkFooterPosition = () => {
      if (appRef.current) {
        const appHeight = appRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        if (appHeight < windowHeight) {
          setFooterPosition("fixed");
        } else {
          setFooterPosition("relative");
        }
      }
    };
    checkFooterPosition();
    window.addEventListener("resize", checkFooterPosition);
    return () => window.removeEventListener("resize", checkFooterPosition);
  }, [location.pathname, data.isLoading]);

  useEffect(() => {
    // console.log("Updated webtoons data:", data.webtoons);
  }, [data.webtoons]);

  useEffect(() => {
    const storedPicks = JSON.parse(localStorage.getItem("myPicks"));
    if (storedPicks) {
      dispatch({ type: "SET_MY_PICKS", payload: storedPicks });
    }
  }, []);

  // before data loading
  if (data.isLoading) {
    return <div>loading</div>;
  }
  // after data loading
  return (
    <>
      <DayStateContext.Provider value={data}>
        <DayDispatchContext.Provider value={dispatch}>
          <Header ref={headerRef} />
          <WebtoonStateContext.Provider value={data.myPicks}>
            <WebtoonDispatchContext.Provider value={dispatch}>
              <main ref={appRef} style={{ paddingTop: `${headerHeight}px` }}>
                <Routes>
                  <Route path="/" element={<Home webtoons={data.webtoons} headerHeight={headerHeight} />} />
                  <Route path="/end" element={<End webtoons={data.webtoons} />} />
                  <Route path="/gift" element={<Gift />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/mypick" element={<MyPage />}>
                    <Route path="recent" element={<TabRecent history={data.history} />} />
                    <Route path="like" element={<TabMyPick />} />
                    <Route path="own" element={<TabMyOwn OwnedList={data.OwnedList} />} />
                  </Route>
                  <Route path="/detail/:id" element={<Detail />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="*" element={<Notfound />} />
                </Routes>
              </main>
            </WebtoonDispatchContext.Provider>
          </WebtoonStateContext.Provider>
        </DayDispatchContext.Provider>
      </DayStateContext.Provider>
      <Footer $position={footerPosition} />
    </>
  );
}

export default App;
