import React from 'react'
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg"
import img2 from "../../assets/images/slider-image-2.jpeg"
import banner from "../../assets/images/grocery-banner.png"
import banner2 from "../../assets/images/grocery-banner-2.jpeg"


export default function MainSlider() {




    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      }; 



  return (
    <>
    <div className="container ">
        <div className="row">
            <div className="w-1/3">
            <img src={img1} alt="" className='w-full mainImg2' />
            <img src={img2} alt="" className='w-full mainImg2' />

            </div>
            <div className="w-2/3">
            <Slider {...settings}> 
            <img src={banner} alt="" className='w-full mainImg' />
            <img src={banner2} alt="" className='w-full mainImg' />


            </Slider>
            </div>

        </div>
        </div>  
    </>
  )
}
