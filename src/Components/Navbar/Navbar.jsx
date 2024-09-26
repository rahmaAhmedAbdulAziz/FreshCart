import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // let {counter} = useContext(CounterContext)

  let { userToken , setUserToken } = useContext(AuthContext)
  // console.log(userToken);
const navigate = useNavigate()

function SignOut() {
  setUserToken("");
  localStorage.removeItem("token");
  navigate("/login")
}

  return <>

    <header className="bg-gray-400 absolute w-full">
      <nav className="container  mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className='flex items-center'>
            <div className="text-white font-bold text-xl me-4">
            <i _ngcontent-ugt-c20="" className="fa-solid fa-cart-shopping nav-icon text-green-700 mx-2 "></i>
              <a href="#">FreshCart</a>
              {/* <h1>{counter}</h1> */}

            </div>

            {userToken && <div className="hidden md:block items-center ">
              <ul className="flex items-center space-x-2">
                <li><NavLink to={"/"} className="block px-1 py-2 text-white ">Home</NavLink></li>
                <li><NavLink to={"/products"} className="block px-1 py-2 text-white ">Products</NavLink></li>
                <li><NavLink to={"/categories"} className="block px-1 py-2 text-white">Categories</NavLink></li>
                <li><NavLink to={"/brands"} className="block px-1 py-2 text-white ">Brands</NavLink></li>
                <li><NavLink to={"/wishList"} className="block px-1 py-2 text-white ">WhishList</NavLink></li>

                <li><NavLink to={"/cart"} className="block px-1 py-2 text-white ">Cart</NavLink></li>

              </ul>
            </div>}

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className='flex gap-2 items-center'>
            <div className="SocialMedia">
              <i className="fa-brands fa-facebook-f text-white mx-1"></i>
              <i className="fa-brands fa-twitter  text-white mx-1"></i>
              <i className="fa-brands fa-linkedin-in  text-white mx-1"></i>
              <i className="fa-brands fa-youtube  text-white mx-1"></i>
              <i className="fa-brands fa-tiktok  text-white mx-1"></i>
            </div>
            <div>
              <ul className='flex gap-1'>

                {!userToken && <>
                <li><NavLink to={"/login"} className="block px-1 py-2 text-white ">Login</NavLink></li>
                  <li><NavLink to={"/register"} className="block px-1 py-2 text-white ">Register</NavLink></li>
                  </>}
                {userToken && <li><button onClick={SignOut} className="block px-1 py-2 text-white">SignOut</button></li>
                }
              </ul>
            </div>
          </div>
        </div>
        {userToken && <div className={isOpen ? "mobile-menu md:hidden" : "mobile-menu md:hidden hidden"}>
          <ul className="mt-4 space-y-4">
            <li><NavLink to={"/"} className="block px-1 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
            <li><NavLink to={"/products"} className="block px-1 py-2 text-white bg-gray-900 rounded">Products</NavLink></li>
            <li><NavLink to={"/categories"} className="block px-1 py-2 text-white bg-gray-900 rounded">Categories</NavLink></li>
            <li><NavLink to={"/brands"} className="block px-1 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
            <li><NavLink to={"/cart"} className="block px-1 py-2 text-white bg-gray-900 rounded">Cart</NavLink></li>


          </ul>
        </div>}


      </nav>
    </header>
  </>

}
