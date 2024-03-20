import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";

const signUpSchema = yup.object({
  firstname: yup.string().required("Bắt buộc nhập họ"),
  lastname: yup.string().required("Bắt buộc nhập tên"),
  email: yup
    .string()
    .email("Email phải hợp lệ")
    .required("Bắt buộc nhập email"),
  mobile: yup.string().required("Bắt buộc nhập số điện thoại"),
  password: yup.string().required("Bắt buộc nhập mật khẩu"),
});

const Signup = () => {
  const authState = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  })

  useEffect(() => {
    if (authState.createdUser !== null && authState.isError === false) {
      navigate("/login");
    }
  }, [authState])
  return (
    <>
      <Meta title={"Đăng Ký"} />
      <BreadCrumb title="Đăng Ký" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Đăng Ký</h3>
                <form
                  action=""
                  onSubmit={formik.handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <CustomInput
                    type="text"
                    name="firstname"
                    placeholder="Nhập họ"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                  />
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>

                  <CustomInput
                    type="text"
                    name="lastname"
                    placeholder="Nhập tên"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>

                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>

                  <CustomInput
                    type="tel"
                    name="mobile"
                    placeholder="Nhập số điện thoại"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>

                  <CustomInput
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>

                  <div>
                    <Link to="/login">
                      Đã có tài khoản?{" "}
                      <span className="text-decoration-underline">
                        Đăng nhập ngay
                      </span>
                    </Link>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button className="button border-0">Đăng ký</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
