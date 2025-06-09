// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../components/loadable/Loadable';

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const HomePage = Loadable(lazy(() => import('../pages/home-page/HomePage')));
const PokemonDetail = Loadable(lazy(() => import('../pages/pokemon-detail/PokemonDetail')));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/home-page" /> },
      { path: '/home-page', exact: true, element: <HomePage /> },
      { path: '/pokemon/:name', exact: true, element: <PokemonDetail /> },
      { path: '*', element: <Navigate to="/home-page" /> },
    ],
  },
];

export default Router;
