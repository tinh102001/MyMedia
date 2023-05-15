import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <div className="card card-register container">
      <div className="card-register-content">
        <div className="logo-app text-center my-4">
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="logo"
              height="60x"
              width="60px"
            />
          </Link>
        </div>
        <div className="auth-title">Đăng ký</div>
        <RegisterForm></RegisterForm>
        <div className="register-footer text-end">
          <div className="my-1 or-text">
            Đã có tài khoản?
            <Link className="registration-link ml-2" to="/login">
              ĐĂNG NHẬP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
