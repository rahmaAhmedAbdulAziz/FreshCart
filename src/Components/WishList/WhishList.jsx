import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import CartProduct from "../cartProduct/cartProduct";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { addProductToCart } from "../Context/cartServices";

export default function WhishList() {
  // const [isClicked, setIsClicked] = useState(false);

  const [heart, setHeart] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserHeart();
  }, []);

  async function getUserHeart() {
    setIsLoading(true);
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
    setHeart(data);
  }

  function clearWishList() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .finally(() => {
        setHeart(null);
      });
  }
  if (isLoading) {
    return <LoadingScreen />;
  }

  return heart ? (
    <div className="">
      <h1 className="mb-10 text-center text-2xl font-bold">
        Wish List({heart?.numOfCartItems})
      </h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="rounded-lg  w-full h-100">
          {heart?.data.products.map((product, index) => {
            return (
              <>
                <CartProduct
                  key={index}
                  product={product}
                  setHeart={setHeart}
                  heart={heart}
                />
                <div className=" justify-between w-full">
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Add to cart
                  </button>
                </div>
              </>
            );
          })}

          {heart?.data.products.length == 0 && (
            <h1>No Products in your Whish List</h1>
          )}
                  <button
                    onClick={clearWishList}
                    className="text-red-500 hover:text-red-900   mx-auto  py-5"
                  >
                    <i className="fa-solid fa-trash mx-1"></i>Remove
                  </button>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-center font-bold text-4xl">No Products in your Cart</h1>
  );
}
