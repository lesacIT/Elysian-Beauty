import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import heart from "../images/heart.png";
import user from "../images/user.png";
import cart from "../images/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/products/productSlice";
import { getUserCart } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const productState = useSelector((state) => state?.product?.product);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [total, setTotal] = useState(null);
//   const getTokenFromLocalStorage = localStorage.getItem("customer")
// //   ? JSON.parse(localStorage.getItem("customer"))
// //   : null;

// // const config2 = {
// //   headers: {
// //     Authorization: `Bearer ${
// //       getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
// //     }`,
// //     Accept: "application/json",
// //   },
// // };

useEffect(() => {
  dispatch(getUserCart())
}, [])

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Miễn phí vận chuyển và thanh toán trực tiếp</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel:+84 946053795">
                  +84 946053795
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">TLIPSTICK</Link>
              </h2>
            </div>
            <div className="col-4">
              <div className="input-group">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected?.[0]?.prod}`)
                    dispatch(getAProduct(selected?.[0]?.prod))
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={"name"}
                  minLength={2}
                  placeholder="Tìm kiếm ..."
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6 text-white" />
                </span>
              </div>
            </div>
            <div className="col-6">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={heart} alt="wishlist" />
                    <p className="mb-0">
                      Danh sách yêu thích
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">Đăng nhập </p>
                    ) : (
                      <p className="mb-0">
                        Xin chào, {authState?.user?.lastname}
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">{total ? total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0'} VNĐ</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/">Trang Chủ</NavLink>
                    <NavLink to="/product">Cửa Hàng</NavLink>
                    <NavLink to="/my-orders">Đơn Hàng Của Tôi</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink to="/about">Giới Thiệu</NavLink>
                    <NavLink to="/contact">Liên Hệ</NavLink>
                    <button
                      onClick={handleLogout}
                      className="border border-0 bg-transparent text-white text-uppercase"
                      type="button"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
