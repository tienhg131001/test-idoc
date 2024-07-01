import { Route, Routes } from "react-router-dom";
import { pages } from "./page";

const Router = () => {
  return (
    <Routes>
      {pages.map((item) => {
        return (
          <Route
            key={item.path}
            path={item.path}
            element={<item.component />}
          />
        );
      })}
    </Routes>
  );
};

export default Router;
