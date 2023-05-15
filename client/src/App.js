import React, {
  Suspense,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketClient from "./SocketClient";
import Peer from "peerjs";

import AppRouter from "./router/AppRouter";

import { refreshToken } from "./redux/actions/authActions";
import { getPosts } from "./redux/actions/postActions";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyActions";
import { GLOBALTYPES } from "./redux/actions/globalTypes";

// import SpinLoader from "./components/Loading/SpinLoader";
import ErrorApp from "./pages/ErrorApp/ErrorApp";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";
import Call from "./components/Message/Call";
import Splash from "./components/Loading/Splash";

const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
};

const App = () => {
  const { auth, call } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [btnActiveHeader, setBtnActiveHeader] = useState("");
  const [themeDark, setThemeDark] = useState(
    localStorage.getItem("theme-dark")
  );

  useEffect(() => {
    setTimeout(() => {
      if (themeDark === "true") {
        document.querySelector("body").style.transition =
          "all 0.3s ease-in-out";
        document.querySelector("body").setAttribute("data-theme", "dark");
      } else {
        document.querySelector("body").style.transition =
          "all 0.3s ease-in-out";
        document.querySelector("body").setAttribute("data-theme", "light");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  const value = {
    btnActiveHeader,
    setBtnActiveHeader,
    themeDark,
    setThemeDark,
  };
  return (
    <ErrorBoundary FallbackComponent={<ErrorApp></ErrorApp>}>
      <Suspense fallback={<Splash />}>
        {auth.token && <SocketClient />}
        {call && <Call />}
        <ConfirmModal />
        <AppContext.Provider value={value}>
          <AppRouter></AppRouter>
        </AppContext.Provider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
