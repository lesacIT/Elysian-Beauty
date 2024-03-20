import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProduct = (props) => {
  const { id, title, img, brand, totalrating, price, quantity } = props;
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img
              src={img}
              className="img-fluid"
              alt="product"
            />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{title}</h6>
            <ReactStars
              count={5}
              size={24}
              value={totalrating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">{price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</span> &nbsp;
            </p>
            <div className="prod-count my-4">
              <p>Sản phẩm còn lại: {quantity}</p>
            </div>
            <Link className="button mb-3" to={"/product/" + id}>
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
