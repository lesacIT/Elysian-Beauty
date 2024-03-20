import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Color from "./../components/Color";
import Container from "../components/Container";

const CompareProduct = () => {
  return (
    <>
      <Meta title={"So Sánh Sản Phẩm"} />
      <BreadCrumb title="So Sánh Sản Phẩm" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src="images/cross.png"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="product-card-image">
                <img
                  src="images/watch2.jpg"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  Đồng hồ thông minh Samsung Galaxy Watch Active 2 44mm
                </h5>
                <h6 className="price mb-3 mt-3">8,000,000 VNĐ</h6>
                <div>
                  <div className="product-detail">
                    <h5>Thương hiệu:</h5>
                    <p>Samsung</p>
                  </div>
                  <div className="product-detail">
                    <h5>Loại hàng:</h5>
                    <p>Đồng hồ</p>
                  </div>
                  <div className="product-detail">
                    <h5>Lượng hàng:</h5>
                    <p>Còn hàng</p>
                  </div>
                  <div className="product-detail">
                    <h5>Màu sắc:</h5>
                    <Color />
                  </div>
                  <div className="product-detail">
                    <h5>Kích thước:</h5>
                    <div className="d-flex gap-10">
                      <p>Nhỏ</p>
                      <p>Lớn</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src="images/cross.png"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="product-card-image">
                <img
                  src="images/watch2.jpg"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  Đồng hồ thông minh Samsung Galaxy Watch Active 2 44mm
                </h5>
                <h6 className="price mb-3 mt-3">8,000,000 VNĐ</h6>
                <div>
                  <div className="product-detail">
                    <h5>Thương hiệu:</h5>
                    <p>Samsung</p>
                  </div>
                  <div className="product-detail">
                    <h5>Loại hàng:</h5>
                    <p>Đồng hồ</p>
                  </div>
                  <div className="product-detail">
                    <h5>Lượng hàng:</h5>
                    <p>Còn hàng</p>
                  </div>
                  <div className="product-detail">
                    <h5>Màu sắc:</h5>
                    <Color />
                  </div>
                  <div className="product-detail">
                    <h5>Kích thước:</h5>
                    <div className="d-flex gap-10">
                      <p>Nhỏ</p>
                      <p>Lớn</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
