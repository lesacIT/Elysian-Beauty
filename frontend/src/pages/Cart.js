import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../features/user/userSlice";

const Cart = () => {
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
  
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  useEffect(()=>{
    dispatch(getUserCart(config2))
  },[])

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart(config2));
      }, 200);
    }
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct({ id: id, config2: config2 }));
    setTimeout(() => {
      dispatch(getUserCart(config2));
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index]?.quantity) * userCartState[index]?.price;
      setTotalAmount(sum);
    }
  }, [userCartState]);
  console.log(userCartState);

  return (
    <>
      <Meta title={"Giỏ Hàng"} />
      <BreadCrumb title="Giỏ Hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Sản phẩm</h4>
              <h4 className="cart-col-2">Giá</h4>
              <h4 className="cart-col-3">Số lượng</h4>
              <h4 className="cart-col-4">Tổng</h4>
            </div>
            {userCartState &&
              userCartState?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  >
                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                      <div className="w-25">
                        <img src={item?.productId?.images?.[0]?.url} className="img-fluid" alt="product" />
                      </div>
                      <div className="w-75">
                        <p>{item?.productId?.title}</p>
                        <p className="d-flex gap-3">
                          Màu sắc:
                          <ul className="colors ps-0">
                            <li
                              style={{ backgroundColor: item?.color?.title }}
                            ></li>
                          </ul>
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">{item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</h5>
                    </div>
                    <div className="cart-col-3 d-flex align-items-center gap-15">
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          name={"quantity" + item?._id}
                          min={1}
                          max={10}
                          id={"cart" + item?._id}
                          value={item?.quantity}
                          onChange={(e) => {
                            setProductUpdateDetail({
                              cartItemId: item?._id,
                              quantity: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          onClick={() => {
                            deleteACartProduct(item?._id);
                          }}
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        {(item?.price * item?.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Tiếp tục mua sắm
              </Link>
              {(totalAmount !== null || totalAmount !== 0) && (
                <div className="d-flex flex-column align-items-end">
                  <h4>Tổng tiền sản phẩm: {totalAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</h4>
                  <p>Thuế và phí vận chuyển được tính khi thanh toán</p>
                  <Link to="/checkout" className="button">
                    Đi đến đặt hàng
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
