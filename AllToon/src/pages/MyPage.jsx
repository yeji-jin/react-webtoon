import { useContext, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { WebtoonStateContext } from "../App";

const MyPage = () => {
  const myPicks = useContext(WebtoonStateContext);
  return (
    <>
      <Outlet context={{ myPicks: myPicks }} />
    </>
  );
};
export default MyPage;
