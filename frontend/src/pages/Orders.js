import React, { useEffect } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getorderedProduct?.orders
  );

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <>
      <BreadCrumb title="Đơn Hàng Của Tôi" />
      <Container class1="cart-wrapper home-wrapper-2 py-5 ">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Số thứ tự</h5>
              </div>
              <div className="col-3">
                <h5>Mã đơn hàng</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền</h5>
              </div>
              <div className="col-3">
                <h5>Trạng thái</h5>
              </div>
            </div>
            <div className="col-12 mt-3">
              {orderState &&
                orderState?.map((item, index) => {
                  return (
                    <div className="row pt-3 my-3 bg-dark" key={index}>
                      <div className="col-3">
                        <p className="text-white">{index + 1}</p>
                      </div>
                      <div className="col-3">
                        <p className="text-white">{item?._id}</p>
                      </div>
                      <div className="col-3">
                        <p className="text-white">{item?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                      </div>
                      <div className="col-3">
                        <p className="text-white">{item?.orderStatus}</p>
                      </div>
                      <div className="col-12">
                        <div className="row p-3 bg-white" >
                          <div className="col-3">
                            <h6>Tên sản phẩm</h6>
                          </div>
                          <div className="col-3">
                            <h6>Số lượng</h6>
                          </div>
                          <div className="col-3">
                            <h6>Giá</h6>
                          </div>
                          <div className="col-3">
                            <h6>Màu sắc</h6>
                          </div>
                          {item?.orderItems?.map((i, index) => {
                            return (
                              <div className="col-12">
                                <div className="row py-3" >
                                  <div className="col-3">
                                    <p>{i?.product?.title}</p>
                                  </div>
                                  <div className="col-3">
                                    <p>{i?.quantity}</p>
                                  </div>
                                  <div className="col-3">
                                    <p>{i?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                  </div>
                                  <div className="col-3">
                                    <ul className="colors ps-0">
                                      <li
                                        style={{
                                          backgroundColor: i?.color?.title,
                                        }}
                                      ></li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Orders;
