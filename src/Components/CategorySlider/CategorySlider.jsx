import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";




export default function CategorySlider() {
  const [category , setCategory] = useState([])

  function getCategory(){
   axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then(({data}) => {
    setCategory(data.data)
  })
  .catch (() =>{

  })
  }

  useEffect(() => {
    getCategory()
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3
  }; 

  return (
    <>
     <div className='py-10 overflow-hidden'>
      <h1 className='text-xl font-bold text-black-700 my-4'>Shop popular Category </h1>
     <Slider {...settings}>

      {category.map((img) => {
        return <img src={img.image} alt={img.name} className='w-100 category-img' />
      })}
     </Slider>
      
      </div> 
    </>
  )
}


// export default function CategorySlider({category}) {
 
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   }; 

//   return (
//     <>
//                 <Slider {...settings}>
//      {category?.map((category , index) => {
//           return <img
//           className="w-90 h-96 img-fluid flex justify-center"
//           src={ category.image} 
//             alt="product image"
//           key={index} 
//          />
       
//      })}
//        <h1>ddd</h1>
//     </Slider>
//     </>
//   )
// }
