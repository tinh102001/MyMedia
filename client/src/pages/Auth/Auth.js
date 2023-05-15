import { Route, Routes, Outlet } from "react-router-dom";
import LottieAnimation from "../../components/lotte/LottieAnimation";
import Login from "./Login";
import Register from "./Register";
function Auth() {
  return (
    <div className="auth">
      <div className="background">
        <Routes>
          <Route
            element={
              <div
                className={`d-flex align-items-center justify-content-center container `}
              >
                <div className="animation-auth" style={{ maxWidth: "30vw" }}>
                  <LottieAnimation
                    path={process.env.PUBLIC_URL + "/lottie/social-media.json"}
                    speed={1}
                  />
                </div>
                <Outlet />
              </div>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index element={<Login />}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default Auth;
