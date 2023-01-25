import * as React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";
import SingUpPage from "../pages/SignUp";


interface IPublicRoutesProps {}

const PublicRoutes: React.FunctionComponent<IPublicRoutesProps> = (props) => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signUp" element={<SingUpPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

export default PublicRoutes;