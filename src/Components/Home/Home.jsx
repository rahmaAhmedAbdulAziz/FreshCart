import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Products/Product'
import { Helmet } from 'react-helmet'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  
  const [products , setProducts] = useState([])

useEffect(() => {
getProducts()
}, [])

async function getProducts(){
let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
setProducts(data?.data);

}
return(
  <>
<Helmet>
  <title>Home</title>
</Helmet>
<MainSlider/>
<CategorySlider/>
    <Product/>
  </>
  
     

)
}