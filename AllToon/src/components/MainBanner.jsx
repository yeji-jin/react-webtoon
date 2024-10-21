import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

const SectionMainBanner = styled.section`
  padding: 40px 0 20px;
  .swiper-button-next,
  .swiper-button-prev {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover {
    .swiper-button-next,
    .swiper-button-prev {
      opacity: 1;
    }
  }
`;
const BannerList = styled.div`
  overflow: hidden;
  position: relative;
  padding-bottom: 50%;
  border-radius: 12px;
  background: #80d0c7;
  color: #fff;
`;
const BannerPoster = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 55%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::before {
    content: "";
    position: absolute;
    left: -10%;
    width: 58%;
    height: 100%;
    background-image: linear-gradient(90deg, #80d0c7 26%, transparent 90%);
  }
`;
const BannerTextBox = styled.div`
  position: absolute;
  left: 10%;
  bottom: 6%;
  width: 40%;
  font-weight: 700;
  color: inherit;
  h4 {
    margin-bottom: 24px;
    font-size: 32px;
    line-height: 1.5;
  }
`;

const MainBanner = ({ mainBanner }) => {
  return (
    <>
      <SectionMainBanner>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={500}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          style={{
            "--swiper-pagination-color": "#ffffff",
            "--swiper-navigation-color": "#222222",
            "--swiper-navigation-size": "24px",
          }}
        >
          {mainBanner.map((banner) => {
            return (
              <SwiperSlide key={banner.id}>
                <BannerList>
                  <BannerPoster>
                    <img src={banner.thumbnail[0]} alt={`웹툰 ${banner.title}`} />
                  </BannerPoster>
                  <BannerTextBox>
                    <h4>{banner.title}</h4>
                  </BannerTextBox>
                </BannerList>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </SectionMainBanner>
    </>
  );
};
export default MainBanner;
