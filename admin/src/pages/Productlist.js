import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteAProduct,
  resetState,
} from "../features/product/productSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Thương hiệu",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Màu sắc",
    dataIndex: "color",
  },
  {
    title: "Giá",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Thao tác",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const getproductState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < getproductState.length; i++) {
    data1.push({
      key: i + 1,
      title: getproductState[i].title,
      brand: getproductState[i].brand,
      category: getproductState[i].category,
      color: getproductState[i].color,
      price: `${getproductState[i].price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
      action: (
        <>
          {/* <Link
            to={`/admin/product/${getproductState[i]._id}`}
            className="fs-4 text-danger"
          >
            <BiEdit />
          </Link> */}
          <button
            className="fs-4 text-danger bg-transparent border-0"
            onClick={() => showModal(getproductState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Danh Sách Sản Phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Bạn có chắc chắn muốn xóa sản phẩm này?"
      />
    </div>
  );
};

export default Productlist;
