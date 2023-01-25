import * as React from "react";
import { useSelector } from "react-redux";
import PublicRoutes from "./PublicRoutes";
import "../styles/login.scss";
import "../styles/style.scss";
import { selectActualUser } from "../redux/features/login/loginSlice";
import { Route, Routes } from "react-router-dom";
import { RootState } from "../redux/store";
import MainPage from "../pages/MainPage";
import DetailPage from "../pages/DetailPage";
import NavBar from "../components/shared/NavBar";

interface IRoutesProps {}

const Router: React.FunctionComponent<IRoutesProps> = () => {
  const logged: boolean = useSelector(
    (state: RootState) => state.login.isLogged
  );
  const user = useSelector(selectActualUser());

  return (
    <div className="App">
      {logged && user != null ? (
        <div className="mainContainer">
          <NavBar />
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </div>
      ) : (
        <PublicRoutes />
      )}
    </div>
  );
};

export default Router;
