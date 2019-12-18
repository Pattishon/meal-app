import React from "react";
import MealsList from "./MealsList";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <div className="main">
      <Sidebar />
      <MealsList />
    </div>
  );
};

export default Main;
