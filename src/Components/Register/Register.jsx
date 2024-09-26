import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {


    const [isLoading, setisLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")
    const [SuccesMsg, setSuccesMsg] = useState("")
const navigate = useNavigate()



    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        onSubmit: register,
        validate: validateData,
    })

    function validateData(values) {
        let errors = {};

        if (values.name == '') {
            errors.name = " Name is Required"
        } else if (values.name.length < 2) {
            errors.name = "Name must be at least 2 characters"
        } else if (values.name.length > 20) {
            errors.name = "Name must be  less than 20 characters"
        }
        if (values.email == '') {
            errors.email = " Email is Required"
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
            errors.email = "Invalid Email"
        }

        if (values.password == '') {
            errors.password = " password is Required"
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(values.password)) {
            errors.password = "Password must be at least 8 characters, at least one letter,  and one special character"
        }
        if (values.rePassword == '') {
            errors.rePassword = " rePassword is Required"
        } else if (values.rePassword != values.password) {
            errors.rePassword = "Password and rePassword must be same "
        }
        if (values.phone == '') {
            errors.phone = " Phone is Required"
        } else if (!/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/.test(values.phone)) {
            errors.phone = "Phone Number must be only number and contain 11 number"
        }

        // console.log(errors);
        return errors;
    }

    async function register() {
        // console.log(values);
        setSuccesMsg(" ")
        setErrorMsg(" ")

        setisLoading(true)
       await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({data}) => {
            setisLoading(false)
            console.log(data);
            setSuccesMsg(data.message)
setTimeout(() => {
    navigate("/login")

},500)
        }).catch((err) => {
            setisLoading(false)
            console.log(err.response.data.message);
            setErrorMsg(err.response.data.message)
        })


        console.log(data);

    }






    return (
        <>
            <div className='min-h-screen flex items-center justify-center'>
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
                            <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="username" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {touched.name && errors.name && <p className='text-red-500'>{errors.name}</p>}
                        </div>


                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                            <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                            <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {touched.password && errors.password && <p className='text-red-500'>{errors.password}</p>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="reconfirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
                            <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="rePassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {touched.rePassword && errors.rePassword && <p className='text-red-500'>{errors.rePassword}</p>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone Number:</label>
                            <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {touched.phone && errors.phone && <p className='text-red-500'>{errors.phone}</p>}
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-300" disabled={isLoading}>Register {isLoading && <i className='fas fa-spinner fa-spin'></i>}  </button>
                        {ErrorMsg && <p className='text-red-500 text-center'>{ErrorMsg}</p>}
                        {SuccesMsg && <p className='text-green-500 text-center'>{SuccesMsg}</p>
                        }
                    </form>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
                        <Link to={"/login"} className="text-blue-500 hover:text-blue-600">Login</Link>
                    </div>

                </div>
            </div>

        </>
    )
}
