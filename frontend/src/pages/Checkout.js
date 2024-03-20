import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createAnOrder, deleteUserCart, getUserCart, resetState } from "./../features/user/userSlice";
import { toast } from "react-toastify";

const shippingSchema = yup.object({
  firstName: yup.string().required("Bắt buộc có họ"),
  lastName: yup.string().required("Bắt buộc có tên"),
  address: yup.string().required("Bắt buộc có địa chỉ"),
  city: yup.string().required("Bắt buộc có thành phố"),
  pincode: yup.number().required("Bắt buộc có mã"),
  mobile: yup.string().required("Bắt buộc có số điện thoại"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.user.token);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [cartProductState, setCartProductState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      if (
        cartState[index] &&
        cartState[index].productId &&
        cartState[index].color
      ) {
        items.push({
          product: cartState[index].productId._id,
          quantity: cartState[index].quantity,
          color: cartState[index].color._id,
          price: cartState[index].price,
        });
      }
    }
    setCartProductState(items);
  }, [cartState]);

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    if (
      authState?.orderedProduct?.order !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate("/my-orders");
    }
  }, [authState]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      pincode: "",
      other: "",
      mobile: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      try {
        const orderDetail = {
          shippingInfo: values,
          orderItems: cartProductState,
          totalPrice: totalAmount,
          orderStatus: "Đã đặt hàng",
        };

        dispatch(createAnOrder({ orderDetail, token }));
        dispatch(deleteUserCart(config2))
        localStorage.removeItem("address")
        dispatch(resetState())
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
  });

  return (
    <>
      <Meta title={"Thanh Toán"} />
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">TLIPSTICK</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Giỏ hàng
                    </Link>
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item text-dark total-price"
                    aria-current="page"
                  >
                    Thông tin
                  </li>
                  &nbsp; /{" "}
                  <li className="breadcrumb-item total-price">Vận chuyển</li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price"
                    aria-current="page"
                  >
                    Thanh Toán
                  </li>
                </ol>
              </nav>
              <h4 className="title total">THÔNG TIN LIÊN HỆ</h4>
              <h4 className="mb-3 total">Địa chỉ giao hàng</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Họ"
                    className="form-control"
                    name="firstName"
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                    value={formik.values.firstName}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Tên"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    value={formik.values.lastName}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                    value={formik.values.address}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Số nhà, căn hộ ..."
                    className="form-control"
                    name="other"
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                    value={formik.values.other}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.other && formik.errors.other}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Thành phố"
                    className="form-control"
                    name="city"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    value={formik.values.city}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    name="pincode"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                    value={formik.values.pincode}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="form-control"
                    name="mobile"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    value={formik.values.mobile}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" /> Trở về giỏ hàng
                    </Link>
                    <button className="button border-0" type="submit">
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div className="w-25 position-relative">
                          <span
                            style={{
                              top: "-10px",
                              right: "-5px",
                            }}
                            className="badge bg-secondary text-white rounded-circle p-1 position-absolute"
                          >
                            {item?.quantity}
                          </span>
                          <img
                            width={100}
                            height={100}
                            src={item?.productId?.images[0]?.url}
                            alt="product"
                          />
                        </div>
                        <div>
                          <h5 className="total">{item?.productId?.title}</h5>
                          <p className="total">{item?.color?.title}</p>
                        </div>
                      </div>
                      <div className="flex-grow-1 d-flex justify-content-end">
                        <h5 className="total">
                          {(item?.price * item?.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                        </h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Tổng tiền sản phẩm</p>
                <p className="total-price">
                  {totalAmount ? (totalAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"} VNĐ
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Phí vận chuyển</p>
                <p className="mb-0 total-price">Miễn phí</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Tổng</h4>
              <h5 className="total-price">
                {totalAmount ? (totalAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"} VNĐ
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
