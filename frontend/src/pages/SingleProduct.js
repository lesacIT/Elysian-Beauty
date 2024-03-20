import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "./../components/Color";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  addToWishlist,
  getAProduct,
  getAllProducts,
} from "../features/products/productSlice";
import { MapInteractionCSS } from "react-map-interaction";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleproduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    toast.success("Sản phẩm đã được thêm vào danh sách yêu thích!");
  };

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, [dispatch]);
  useEffect(() => {
    if (productState) {
      for (let index = 0; index < cartState?.length; index++) {
        if (getProductId === cartState[index]?.productId?._id) {
          setAlreadyAdded(true);
          break; // Khi tìm thấy sản phẩm trong giỏ hàng, thoát khỏi vòng lặp
        }
      }
    }
  }, [productState, cartState, getProductId]);

  const uploadCart = () => {
    if (color === null) {
      toast.error("Vui lòng chọn màu");
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity,
          color,
          price: productState?.price,
        })
      );
      navigate("/cart");
    }
  };

  const [orderedProduct] = useState(true);
  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  // const closeModal = () => {};
  const [popularProduct, setPopularProduct] = useState([]);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      if (element.tags === "Thịnh hành") {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productState]);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Vui lòng đánh giá số sao cho sản phẩm");
      return false;
    } else if (comment === null) {
      toast.error("Vui lòng viết đánh giá về sản phẩm");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  return (
    <>
      <Meta title={"Chi Tiết Sản Phẩm"} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product py-5 home-wrapper-2">
        <div className="row">
          <div className="col-5">
            <div className="main-product-image">
              <div>
                <MapInteractionCSS
                  showControls
                  defaultValue={{
                    scale: 1,
                    translation: { x: 0, y: 20 },
                  }}
                  minScale={0.5}
                  maxScale={3}
                  translationBounds={{
                    xMax: 400,
                    yMax: 200,
                  }}
                >
                  <img
                    src={productState?.images?.[0]?.url}
                    alt="product"
                    className="img-fluid d-flex mx-auto"
                  />
                </MapInteractionCSS>
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productState?.images?.map((item, index) => {
                return (
                  <div>
                    <img
                      src={item?.url}
                      className="img-fluid d-flex mx-auto"
                      alt="product"
                    />
                  </div>
                );
              })}
              {productState?.images.map((item, index) => {
                return (
                  <div>
                    <img
                      src={item?.url}
                      className="img-fluid d-flex mx-auto"
                      alt="product"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-7">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  {productState?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  VNĐ
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalrating?.toString()} 
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(1 đánh giá)</p>
                </div>
                <a className="review-btn" href="#review">
                  Viết một đánh giá
                </a>
              </div>
              <div className="py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Thương hiệu:</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Danh mục:</h3>
                  <p className="product-data"> {productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Phân loại:</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Lượng hàng:</h3>
                  <p className="product-data">{productState?.quantity}</p>
                </div>
                {alreadyAdded === false && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Màu sắc:</h3>
                      <Color
                        setColor={setColor}
                        colorData={productState?.color}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Số lượng:</h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          className="form-control"
                          style={{ width: "70px" }}
                          id=""
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        />
                      </div>
                    </>
                  )}
                  <div
                    className={
                      alreadyAdded
                        ? "ms-0"
                        : "ms-5" + "d-flex align-items-center gap-30 ms-5"
                    }
                  >
                    <button
                      className="button border-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => {
                        alreadyAdded ? navigate("/cart") : uploadCart();
                      }}
                    >
                      {alreadyAdded ? "Đi đến giỏ hàng" : "Thêm vào giỏ hàng"}
                    </button>
                    {/* <button className="button signup">Mua ngay</button> */}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => addToWish(productState?._id)}
                    >
                      <AiOutlineHeart className="fs-5 me-2" />
                      Thêm vào danh sách yêu thích
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Vận chuyển & hoàn trả:</h3>
                  <p className="product-data">
                    Miễn phí vận chuyển và trả lại cho tất cả các đơn đặt hàng
                    có giá trị từ 1 triệu! <br /> Chúng tôi vận chuyển tất cả
                    các đơn đặt hàng trong nước trong vòng <b>5-7 ngày!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Liên kết sản phẩm:</h3>
                  <button
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                    className="custom-link border-0 bg-white fw-"
                  >
                    <p className="mb-0">
                      <small>Sao chép liên kết sản phẩm</small>
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Mô tả</h4>
            <div className="description-inner-wrapper bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Đánh giá</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Các đánh giá từ khách hàng</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalrating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Dựa trên tất cả đánh giá</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="/">
                      Viết một đánh giá
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Viết một đánh giá</h4>

                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e);
                    }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    color="30"
                    rows="4"
                    placeholder="Viết lời đánh giá, nhận xét sản phẩm tại đây"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    onClick={addRatingToProduct}
                    className="button border-0"
                    type="button"
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState?.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex gap-10 align-items-center">
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Có thể bạn cũng thích</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={popularProduct} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
