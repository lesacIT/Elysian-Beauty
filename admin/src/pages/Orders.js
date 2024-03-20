import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Tổng tiền",
    dataIndex: "amount",
  },
  {
    title: "Ngày đặt",
    dataIndex: "date",
  },
  {
    title: "Trạng thái đơn hàng",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.lastname,
      product: (
        <Link className="text-decoration-none" to={`/admin/order/${orderState[i]?._id}`}>Xem đơn hàng</Link>
      ),
      amount: orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select
            name="" defaultValue={orderState[i]?.orderStatus}
            onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value)}
            className="form-control form-select"
            id=""
          >
            <option value="Đã đặt hàng" disabled selected>
              Đã đặt hàng
            </option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đang vận chuyển">Đang vận chuyển</option>
            <option value="Đang giao hàng">Đang giao hàng</option>
            <option value="Đã giao hàng">Đã giao hàng</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a,b) => {
    dispatch(updateAOrder({id:a, status:b}));
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Đơn Hàng</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
