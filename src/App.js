import React from "react";
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import Weather from "./pages/Weather";
import Poll from "./pages/Poll";
import BoardFree from "./pages/BoardFree";
import BoardFood from "./pages/BoardFood";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Categories />
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/poll" element={<Poll />} />
        <Route path="/board/free" element={<BoardFree />} />
        <Route path="/board/food" element={<BoardFood />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
