import React from 'react'
import Slider from "react-slick";


export default function ProductImageSlider({images}) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }; 

    return (
    <>
                <Slider {...settings}>
     {images?.map((img , index) => {
          return <img key={index} className=" w-full mx-auto rounded-md object-contain max-w-lg px-10" src={img} alt="Nike Air" />

     })}
    </Slider>
    </>
  )
}
