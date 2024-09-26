import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Login() {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")
    const [SuccesMsg, setSuccesMsg] = useState("")
let {setUserToken} = useContext(AuthContext)
// console.log(setUserToken);


    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues: {
             email: "",
            password: "",
        
        },
        onSubmit: login,
        validate: validateData,
    })

    function validateData(values) {
        let errors = {};

        
        if (values.email == '') {
            errors.email = " Email is Required"
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)){
            errors.email = "Invalid Email"
        }
            
            if (values.password == '') {
                errors.password = " password is Required"
            } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password)) {
                errors.password = "Password must be at least 8 characters, at least one letter,  and one special character"
            }

        // console.log(errors);
        return errors;
    }

   async function login() {
        // console.log(values);
        setSuccesMsg(" ")

        setErrorMsg("")
        setisLoading(true)

 await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({data}) =>{
setisLoading(false)
setUserToken(data.token);
localStorage.setItem("token", data.token)
if(location.pathname == "/login"){
    navigate("/")
} else {
    
    navigate(location.pathname)
    console.log(location.pathname);
}

 }).catch((err)=>{
    setisLoading(false)
setErrorMsg(err.response.data.message);

})
// console.log({data});
   
}






    return (
        <>
        <Helmet>
            <title>Login</title>
        </Helmet>
            <div className='py-20 flex items-center justify-center'>
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                   


                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                            <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p>}  
                                                  </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                            <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {touched.password && errors.password &&<p className='text-red-500'>{errors.password}</p>}
                        </div>

                     
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400 " disabled={isLoading}>Login {isLoading && <i className='fas fa-spinner fa-spin'></i>} </button>
                        {ErrorMsg && <p className='text-red-500 text-center'>{ErrorMsg}</p>}
                        {SuccesMsg && <p className='text-green-500 text-center'>{SuccesMsg}</p> }
                    </form>

                    <div className="mt-4 text-center">  
                        <span className="text-sm text-gray-500 dark:text-gray-300">I did not have an account? </span>
                        <Link to={"/register"} className="text-blue-500 hover:text-blue-600">Register</Link>
                    </div>

                </div>
            </div>
            
        </>
    )
}
