import RatingStars from "../RatingStars/RatingStars";
import { Link } from "react-router-dom";
import { addProductToCart } from "../Context/cartServices";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
// import { AuthContext } from "../Context/AuthContext";
import { Bounce, toast } from "react-toastify";

export default function Product() {
  // let { userToken } = useContext(AuthContext);
  const [product, setProduct] = useState([]);
  const [isLiked, setIsLiked] = useState(false);


  async function AddProductToWishList(productId) {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    toast.success("Product Add To Wish list", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "light",
      transition: Bounce,
    });
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProduct(data?.data);
  }

  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <div className="max-w-l mx-auto grid grid-cols-1 gap-3 md:grid-cols-4">
        {product?.map((product) => {
          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={"/productDetails/" + product.id}>
                <img
                  className="rounded-t-lg p-8"
                  src={product.imageCover}
                  alt="product image"
                />
              </Link>
              <div className="px-5 pb-5">
                <Link to={"/productDetails/" + product.id}>
                  <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="line-clamp-1">{product.description}</p>
                </Link>
                <RatingStars rating={product.ratingsAverage} />
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                  <button onClick={() => AddProductToWishList(product.id)}>
                    <i
                      className={
                        isLiked
                          ? "fa fa-heart text-red-500 text-2xl"
                          : "fa fa-heart text-gray-500 text-2xl"
                      }
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
