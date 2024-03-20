import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "./../components/SpecialProduct";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { services } from "../utils/Data";
import moment from "moment";
import { getAllBlogs } from "./../features/blogs/blogSlice";
import { getAllProducts } from "../features/products/productSlice";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import heart2 from "../images/heart2.png";
import view from "../images/view.png";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import { getUserCart } from "../features/user/userSlice";

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product.product);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    getBlogs();
    getallProducts();
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getallProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id, title) => {
    dispatch(addToWishlist(id));
    notifySuccess(title);
  };

  const notifySuccess = (productName) => {
    toast.success(`Đã thêm sản phẩm vào danh sách yêu thích!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  console.log(productState);

  return (
    <>
      <Meta title={"Trang Chủ"} />
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>ƯU ĐÃI CỰC LỚN</h4>
                <h5>Mua 2 Tặng 1</h5>
                <p>Đừng bỏ lỡ ưu đã cực lớn dịp cuối năm</p>
                <Link to="/product">
                  <button className="button">XEM NGAY</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align items-center">
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>ƯU ĐÃI TỐT NHẤT</h4>
                  <h5>
                    <em>innisfree</em>
                  </h5>
                  <p>Đa dạng màu sắc</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>SẢN PHẨM MỚI</h4>
                  <h5>M.A.C</h5>
                  <p>Thương hiệu hàng đầu</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-03.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>GIẢM GIÁ 15%</h4>
                  <h5>3CE</h5>
                  <p>
                    Mua ngay các <br /> màu sắc mới nhất
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>VẬN CHUYỂN NHANH</h4>
                  <h5>Bbia</h5>
                  <p>
                    Chất son cực mịn <br /> mượt mà trên môi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services &&
                services?.map((i, j) => {
                  return (
                    <div className="d-flex align-items-center gap-15" key={j}>
                      <img src={i?.image} alt="services" />
                      <div>
                        <h6>{i?.title}</h6>
                        <p className="mb-0">{i?.tagline}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex align-items-center">
                <div>
                  <h6>Máy Ảnh</h6>
                  <p>10 Sản Phẩm</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Sản Phẩm</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6>Game</h6>
                  <p>10 Sản Phẩm</p>
                </div>
                <img src="images/game.jpg" alt="game" />
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6>Tai Nghe</h6>
                  <p>10 Sản Phẩm</p>
                </div>
                <img src="images/headphone.jpg" alt="headphone" />
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6>Máy Tính</h6>
                  <p>10 Sản Phẩm</p>
                </div>
                <img src="images/laptop.jpg" alt="laptop" />
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6>Điện Thoại</h6>
                  <p>10 Sản Phẩm</p>
                </div>
                <img src="images/mobile.jpg" alt="mobile" />
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6>Loa</h6>
                  <p>10 Sản Phẩm</p>
                </div>
                <img src="images/speaker.jpg" alt="speaker" />
              </div>
              <div className="d-flex align-items-center">
                <div>
                  <h6>Đồng Hồ</h6>
                  <p>10 Sản Phẩm</p>
                </div>
                <img src="images/watch.jpg" alt="watch" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="featured-wrapper pb-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-uppercase">
              Bộ Sưu Tập Mới Nhất
            </h3>
          </div>
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "Mới nhất") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => {
                            addToWish(item?._id);
                          }}
                        >
                          <img src={heart2} alt="wishlist" />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images?.[0]?.url}
                          className="img-fluid mx-auto"
                          alt="product"
                          width={250}
                        />
                        {/* <img
                          src={item?.images[0].url}
                          className="img-fluid mx-auto"
                          alt="product"
                          width={160}
                        /> */}
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">{item?.title}</h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={
                            item?.totalrating ? item?.totalrating?.toString() : 0
                          }
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="price">
                          {item?.price
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                        </p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button> */}
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          {/* <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="famous-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-01.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>ĐA DẠNG MẪU MÃ</h5>
                <h6>Son Tint Bóng</h6>
                <p>Giá chỉ từ 150.000</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-02.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Màu Sắc Tươi Tắn</h5>
                <h6 className="text-dark">Cực Mướt Trên Môi</h6>
                <p className="text-dark">Bộ sưu tập mới nhất từ 3CE</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-03.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Đa dạng màu sắc</h5>
                <h6 className="text-dark">Thể Hiện Chất Riêng</h6>
                <p className="text-dark">Cho bạn nhiều lựa chọn</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-04.jpg"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Mua ngay hôm nay</h5>
                <h6 className="text-dark">Chất Son Khác Nhau</h6>
                <p className="text-dark">Mang nhiều màu sắc</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-uppercase">
              Sản Phẩm Đặc Biệt
            </h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "Đặc biệt") {
                return (
                  <SpecialProduct
                    key={index}
                    id={item?._id}
                    title={item?.title}
                    brand={item?.brand}
                    value={Number(item?.totalrating)}
                    price={item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    img={item?.images?.[0]?.url}
                  />
                );
              }
            })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-uppercase">
              Sản Phẩm Thịnh Hành
            </h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState?.map((item, index) => {
              if (item.tags === "Thịnh hành") {
                return (
                  <div key={index} className={"col-3"}>
                    <div className="product-card position-relative">
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={(e) => {
                            addToWish(item?._id);
                          }}
                        >
                          <img src={heart2} alt="wishlist" />
                        </button>
                      </div>
                      <div className="product-image">
                        <img
                          src={item?.images?.[0]?.url}
                          className="img-fluid mx-auto"
                          alt="product"
                          width={250}
                        />
                        {/* <img
                          src={item?.images[0].url}
                          className="img-fluid mx-auto"
                          alt="product"
                          width={160}
                        /> */}
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">{item?.title}</h5>
                        <ReactStars
                          count={5}
                          size={24}
                          value={
                            item?.totalrating ? item?.totalrating.toString() : 0
                          }
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="price">
                          {item?.price
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          VNĐ
                        </p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          {/* <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button> */}
                          <button className="border-0 bg-transparent">
                            <img
                              onClick={() => navigate("product/" + item?._id)}
                              src={view}
                              alt="view"
                            />
                          </button>
                          {/* <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </Container>
      <Container class1="marquee-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper bg-white p-3 card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.jpg" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.jpg" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.jpg" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.jpg" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.jpg" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.jpg" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.jpg" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.jpg" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-09.jpg" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper pt-4 pb-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading text-uppercase">
              Blog Của Chúng Tôi
            </h3>
          </div>
          <div className="row">
            {blogState &&
              blogState?.map((item, index) => {
                if (index < 3) {
                  return (
                    <div className="col-3" key={index}>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images?.[0]?.url}
                        date={moment(item?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
