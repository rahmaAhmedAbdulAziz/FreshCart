import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [Category, setCategory] = useState([]);
  useEffect(() => {
    getCategories()
    }, [])
   async function getCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setCategory(data?.data)
    
  } 

return (
<>
<Helmet>

  <title>Brands</title>
</Helmet>
  <h1 className="text-5xl text-center text-green-400 p-5 font-bold " > All Brands</h1>
<div className="container">
  <div className="row">

{Category?.map((category)=>{

  return (
<div className="flex flex-col w-64 justify-between  my-1  hover:shadow-xl shadow-sm hover:border-spacing-6  mx-5">
<Link to={"/Category/"+ category._id}>
      <img
        className="w-90 h-96 img-fluid flex justify-center"
        src={ category.image}
        alt="product image"
        
       />
</Link>
       <h1 className="text-center font-semibold text-green-600 text-3xl">{category.name}</h1>

</div>
  )
})}

</div>
</div>
</> 

)}

