import React, { ReactElement } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useRouteError,
} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ErrorPage from "../components/Error/ErrorPage";
import { Search } from "../pages/Search";
import Detail from "../pages/Detail";
import Favourites from "../pages/Favourites";

const ErrorBoundary = (): ReactElement => {
  const error = useRouteError();
  console.error(error);
  return (
    <Layout>
      <ErrorPage />
    </Layout>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route path="/" element={<Search />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
    </>
  )
);
