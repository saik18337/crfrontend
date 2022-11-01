import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Link from "next/link";
import axios from "axios";

const ListingArea = () => {
  const [listings,setListings]=useState([]);

  useEffect(()=>{
     axios.get(`${process.env.NEXT_PUBLIC_API_URLBACKEND}/listing`).then(data=>{
      setListings(data.data.data)
     }).catch(err=>{
      console.log(err)
     })


  },[])
  
  return (
    <>
      <section className="listings-area ptb-100 bg-f9f9f9">
        <div className="container">
          <div className="section-title">
            <h2>Trending Listings Right Now</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra.
            </p>
          </div>

          <Swiper
            spaceBetween={25}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
            className="listings-slides"
          >

            {
              listings.map(ele=>(
                <SwiperSlide>
              <div className="single-listings-box">
                <div className="listings-image">
                  <Swiper 
                    loop={true}
                    navigation={true} 
                    modules={[Navigation]} 
                    className="listings-image-slides"
                  >
                    {
                      ele.files.split(",").map(file=>(
                        <SwiperSlide>
                        <div className="single-image">
                          <img src={file} alt="image" style={{width:"100%", height:"300px"}}/>
                          <Link href={`/single-listings/${ele.id}`}>
                            <a className="link-btn"></a>
                          </Link>
                        </div>
                      </SwiperSlide>

                      ))
                    }
                   

                  
                  </Swiper>

                  <a href="#" className="bookmark-save">
                    <i className="flaticon-heart"></i>
                  </a>
                  <a href="#" className="category">
                    <i className="flaticon-cooking"></i>
                  </a>
                </div>

                <div className="listings-content">
                  <div className="author">
                    <div className="d-flex align-items-center">
                      <img src="/images/user2.jpg" alt="image" />
                      <span>Sarah</span>
                    </div>
                  </div>
                  <ul className="listings-meta">
                    <li>
                      <a href="#">
                        <i className="flaticon-furniture-and-household"></i> Hotel
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="flaticon-pin"></i> {ele.location}
                      </a>
                    </li>
                  </ul>
                  <h3>
                    <Link href="/single-listings">
                      <a>{ele.title}</a>
                    </Link>
                  </h3>
                  <span className="status">
                    <i className="flaticon-save"></i> Open Now
                  </span>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="rating">
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bx-star"></i>
                      <span className="count">(10)</span>
                    </div>
                    <div className="price">
                      Start From <span>{ele.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <div className="divider2"></div>
      </section>
    </>
  );
};

export default ListingArea;