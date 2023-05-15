import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../../redux/actions/authActions";

import Alert from "../../components/Alert/Alert";

const initialValues = {
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "Nam",
};

const RegisterForm = () => {
  const { auth } = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordAgain, setIsShowPasswordAgain] = useState(false);

  const eyeToggle1s = Array.from(document.getElementsByClassName("eyeToggle1"));
  eyeToggle1s.forEach((eyeToggle) => {
    eyeToggle.addEventListener("click", (e) => {
      setIsShowPassword(!isShowPassword);
    });
  });

  const eyeToggle2s = Array.from(document.getElementsByClassName("eyeToggle2"));
  eyeToggle2s.forEach((eyeToggle) => {
    eyeToggle.addEventListener("click", (e) => {
      setIsShowPasswordAgain(!isShowPasswordAgain);
    });
  });

  const handleCheckUserName = (username) => {
    if (!username) {
      formik.setFieldError("username", "Trường này không được bỏ trống");
      return;
    }
    //    Thiếu check user tồn tại
  };
  const RegistrationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(3, "Tên đăng nhập phải tối thiểu 3 ký tự")
      .max(50, "Tên đăng nhập chỉ tối đa 50 ký tự")
      .required("Trường này không được bỏ trống"),
    username: Yup.string()
      .min(3, "Tên tài khoản phải tối thiểu 3 ký tự")
      .max(50, "Tên tài khoản chỉ tối đa 50 ký tự")
      .required("Trường này không được bỏ trống")
      .matches(
        /^[a-zA-Z0-9_]+$/i,

        "Vui lòng không nhập ký tự đặc biệt và khoảng trắng"
      ),
    email: Yup.string()
      .email("Không đúng định dạng email")
      .min(3, "Email tối thiểu 3 ký tự")
      .max(50, "Email tối đa 50 ký tự")
      .required("Trường này không được bỏ trống"),
    password: Yup.string()
      .min(
        6,

        "Mật khẩu tối thiểu 6 ký tự"
      )
      .matches(
        /^\S(.*)+$/i,

        "Mật khẩu của bạn không bắt đầu bằng khoảng trắng"
      )
      .matches(
        /(.*)+\S$/i,

        "Mật khẩu của bạn không kết thúc bằng khoảng trắng"
      )
      .max(50, "Mật khẩu tối đa 50 ký tự")
      .required("Trường này không được bỏ trống"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],

        "Xác nhận mật khẩu không chính xác"
      )
      .required("Trường này không được bỏ trống"),
  });
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: RegistrationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-register">
      <Alert />
      <Row>
        <Col
          md={12}
          className="form-group"
          style={{
            marginBottom:
              formik.touched.fullname && formik.errors.fullname
                ? "0.8rem"
                : "1rem",
          }}
        >
          <div
            className="input-text-container"
            onBlur={() => {
              handleCheckUserName(formik.getFieldProps("fullname").value);
            }}
          >
            <div className="input-group">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                className="form-control"
                placeholder="Họ và tên"
                {...formik.getFieldProps("fullname")}
              />
            </div>
          </div>
          {formik.touched.fullname && formik.errors.fullname ? (
            <div
              className="fv-plugins-message-container"
              style={{ paddingLeft: "40px" }}
            >
              <div className="fv-help-block">{formik.errors.fullname}</div>
            </div>
          ) : null}
        </Col>
        <Col
          md={12}
          className="form-group"
          style={{
            marginBottom:
              formik.touched.username && formik.errors.username
                ? "0.8rem"
                : "1rem",
          }}
        >
          <div
            className="input-text-container"
            onBlur={() => {
              handleCheckUserName(formik.getFieldProps("username").value);
            }}
          >
            <div className="input-group">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                className="form-control"
                placeholder="Tên tài khoản"
                {...formik.getFieldProps("username")}
              />
            </div>
          </div>
          {formik.touched.username && formik.errors.username ? (
            <div
              className="fv-plugins-message-container"
              style={{ paddingLeft: "40px" }}
            >
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
        </Col>
        <Col
          md={12}
          className="form-group"
          style={{
            marginBottom:
              formik.touched.email && formik.errors.email ? "0.8rem" : "1rem",
          }}
        >
          <div className="input-text-container">
            <div className="input-group">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <input
                className="form-control"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
            </div>
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div
              className="fv-plugins-message-container"
              style={{ paddingLeft: "40px" }}
            >
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </Col>
        <Col
          md={12}
          className="form-group"
          style={{
            marginBottom:
              formik.touched.password && formik.errors.password
                ? "0.8rem"
                : "1rem",
          }}
        >
          <div className="input-text-container">
            <div className="input-group">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                id="passwordText"
                type={isShowPassword ? "text" : "password"}
                className="form-control"
                placeholder={"Nhập mật khẩu"}
                {...formik.getFieldProps("password")}
              />
              {isShowPassword && (
                <img
                  className="eyeToggle1"
                  style={{ marginRight: "15px" }}
                  src={process.env.PUBLIC_URL + "/icons/eye.svg"}
                  alt="eye"
                />
              )}
              {!isShowPassword && (
                <FontAwesomeIcon
                  style={{ marginRight: "15px" }}
                  className="eyeToggle1"
                  icon={faEyeSlash}
                />
              )}
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div
              className="fv-plugins-message-container"
              style={{ paddingLeft: "40px" }}
            >
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </Col>
        <Col
          md={12}
          className="form-group"
          style={{
            marginBottom:
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "0.8rem"
                : "1rem",
          }}
        >
          <div className="input-text-container">
            <div className="input-group">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                id="passwordAgainText"
                type={isShowPasswordAgain ? "text" : "password"}
                className="form-control"
                placeholder={"Xác nhận lại mật khẩu"}
                {...formik.getFieldProps("confirmPassword")}
              />
              {isShowPasswordAgain && (
                <img
                  className="eyeToggle2"
                  style={{ marginRight: "15px" }}
                  src={process.env.PUBLIC_URL + "/icons/eye.svg"}
                  alt="eye"
                />
              )}
              {!isShowPasswordAgain && (
                <FontAwesomeIcon
                  style={{ marginRight: "15px" }}
                  className="eyeToggle2"
                  icon={faEyeSlash}
                />
              )}
            </div>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div
              className="fv-plugins-message-container"
              style={{ paddingLeft: "40px" }}
            >
              <div className="fv-help-block">
                {formik.errors.confirmPassword}
              </div>
            </div>
          ) : null}
        </Col>
        <Col md={12} className="form-group">
          <div className="options-gender d-flex mb-4 ">
            <span className="label-gender">Giới tính</span>
            <div className="option d-flex">
              <div className="custom-control">
                <input
                  id="male"
                  type="radio"
                  value="Nam"
                  name="gender"
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.gender === "Nam"}
                />
                <label className="custom-control-label" htmlFor="male">
                  Nam
                </label>
              </div>
              <div className="custom-control">
                <input
                  id="female"
                  type="radio"
                  value="Nữ"
                  name="gender"
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.gender === "Nữ"}
                />
                <label className="custom-control-label" htmlFor="female">
                  Nữ
                </label>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={12}>
          <button
            type="submit"
            className="btn btn-primary btn-block mb-3"
            style={{ borderRadius: 10 }}
            // disabled={formik.isSubmitting}
          >
            Đăng ký
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default RegisterForm;
