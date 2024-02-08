import App from "./components/App.js";
import Login from "./components/pages/Login.js";
import Main from "./components/pages/Main";
import Profile from "./components/pages/Profile";
import User from "./components/pages/User";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/main", element: <Main /> },
      { path: "/profile", element: <Profile /> },
      {
        path: "/users/:userId/",
        element: <User />,
      },
    ],
  },
];

export default routes;
