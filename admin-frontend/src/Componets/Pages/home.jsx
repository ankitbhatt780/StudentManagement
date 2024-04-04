import React from "react";
import SideBar from "./SideBar";

export const Home = () => {
  return (
    <>
      <div className="h1" style={{ marginTop: "63px" }}>
        <SideBar />
      </div>
      <div
        style={{
          margin: "10px",
          marginLeft: "90px",
          gap: "1vh",
        }}
      />
    </>
  );
};
