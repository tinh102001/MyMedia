import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Conversation from "../pages/Message/Conversation";

const HomePage = lazy(() => import("../pages/HomePage"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Login = lazy(() => import("../pages/Auth/Login"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Setting = lazy(() => import("../pages/Setting"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const MyProfile = lazy(() => import("../pages/MyProfile"));
const Explore = lazy(() => import("../pages/Explore"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const Message = lazy(() => import("../pages/Message/Message"));

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/setting"
        element={
          <PrivateRoute>
            <Setting />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />
      <Route
        path="/explore"
        element={
          <PrivateRoute>
            <Explore />
          </PrivateRoute>
        }
      />
      <Route
        path="/post/:id"
        element={
          <PrivateRoute>
            <PostDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/message"
        element={
          <PrivateRoute>
            <Message />
          </PrivateRoute>
        }
      />
      <Route
        path="/message/:id"
        element={
          <PrivateRoute>
            <Conversation />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
