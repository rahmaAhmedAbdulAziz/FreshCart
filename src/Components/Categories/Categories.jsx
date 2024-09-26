import { Link } from "react-router-dom";
import { addProductToCart } from "../Context/cartServices";
import { useEffect, useState } from "react";
import axios from "axios";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

export default function Categories() {
  const [Category, setCategory] = useState([]);
  useEffect(() => {
    getCategories()
    }, [])
   async function getCategories() {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategory(data?.data)
    
  } 

return (
<>
<div className="container">
  <div className="row">
{Category?.map((category)=>{
  return (
<div className="flex flex-col w-80 justify-between p-4 my-4  hover:shadow-xl shadow-sm hover:border-2 gap-5 px-4">
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

