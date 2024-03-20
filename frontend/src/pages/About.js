import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Meta title={"Giới Thiệu"} />
      <BreadCrumb title="Giới Thiệu" />
      <Container class1="policy-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="container pb-4">
            <div className="row g-5 align-items-end">
              <div className="col-lg-3 col-md-5 wow fadeInUp">
                <img className="img-fluid rounded" src="../images/about.jpg" />
              </div>
              <div
                className="col-lg-6 col-md-7 wow fadeInUp"
                data-wow-delay="0.3s"
              >
                <h4 className="display-4 mb-0 color">24/7</h4>
                <p className="color mb-4 ">
                  Luôn sẵn sàng phục vụ cho nhu cầu mua son của bạn
                </p>
                <h1 className="display-5 mb-4 text-muted">
                  MANG ĐẾN CHO BẠN NHỮNG THỎI SON ĐẸP
                </h1>
                <p className="mb-4">
                  TLIPSTICK cung cấp các dòng son đa dạng từ màu sắc, chất liệu
                  đến mẫu mã.
                </p>
                <p className="mb-4">
                  Chúng tôi luôn cố gắng đem đến cho bạn những dòng son chất
                  lượng, khác biệt hoàn toàn so với thị trường để đáp ứng mọi
                  nhu cầu làm đẹp của khách hàng.
                </p>
                <Link to="/product">
                  <button className="button">Khám phá ngay</button>
                </Link>
              </div>
              <div
                className="col-lg-3 col-md-12 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div className="row g-5">
                  <div className="col-12 col-sm-6 col-lg-12">
                    <div className="border-start ps-4">
                      <i className="fa fa-thumbs-up fa-3x mb-3 color"></i>
                      <h4 className="mb-3">Cam Kết Chất Lượng</h4>
                      <span className="text-muted">
                        Chúng tôi luôn muốn mang đến cho khách hàng những sản
                        phẩm chất lượng tốt nhất.
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-12">
                    <div className="border-start ps-4">
                      <i className="fa fa-users fa-3x mb-3 color"></i>
                      <h4 className="mb-3">Làm Việc Tận Tình</h4>
                      <span className="text-muted">
                        Hãy liên hệ ngay nếu bạn có thắc mắc hoặc cần tư vấn.
                        Chúng tôi luôn sẵn sàng phục vụ.
                      </span>
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

export default About;
