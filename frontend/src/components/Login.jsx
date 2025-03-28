import React, { useEffect, useState } from 'react'
import Page from './Page'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset
  } = useForm();

  const navigate = useNavigate();
  const [classes, setClasses] = useState('loginSubmit w-32 bg-white text-lg sm:text-xl font-medium rounded-full h-14 hover:cursor-pointer transition-all duration-200 disabled:bg-slate-400 disabled:text-slate-900 disabled:shadow-none disabled:cursor-default');

  useEffect(() => {
    document.title = "Login";
  }, []);

  const onSubmit = async (data) => {

    const info = await fetch("https://loginsignup-page.onrender.com:3000/login", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const response = await info.json();
    
    if (response.code == 404) {
      setError("invalidCred", { message: response.error });
    }
    else {
      const prevClass = classes;
      setClasses(prevClass+' scale-[20] bg-black hover:text-black hover:cursor-default');
      setTimeout(() => {
        navigate(`../welcome/${response.name}`);
      }, 500)
    }

  }

  const content = <motion.div className='w-full h-full flex justify-center items-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2.5, type: 'spring', stiffness: 50 }}>
    <div className="loginMain flex flex-col w-[80%] sm:w-[45%] gap-10">
      <div className="headingLogin flex flex-col gap-2">
        <h1 className='text-white text-2xl sm:text-4xl'>Login Form</h1>
        <div className='bg-white w-16 sm:w-28 h-1 rounded-full'></div>
      </div>
      <form onSubmit={(e) => {
        clearErrors();
        handleSubmit(onSubmit)(e);
      }}>
        <div className="loginForm flex-col flex items-start gap-10">
          <div className="mail w-full">
            <input type="email" placeholder='Email' {...register("email", { required: { value: true, message: "This field is required" } })} className='loginInput w-full h-14 rounded-full outline-none text-white px-5 placeholder:text-white text-[14px] sm:text-lg focus:placeholder:text-[12px] sm:focus:placeholder:text-sm placeholder:transition-all placeholder:duration-200' />
            {errors.email && <div className='text-red-600 mx-2'>{errors.email.message}</div>}
          </div>
          <div className="pass w-full">
            <input type="password" placeholder='Password' {...register("password", { required: { value: true, message: "This field is required" } })} className='loginInput w-full h-14 rounded-full outline-none text-white px-5 placeholder:text-white text- sm:text-lg focus:placeholder:text-[12px] sm:focus:placeholder:text-sm placeholder:transition-all placeholder:duration-200' />
            {errors.invalidCred && <div className='text-red-600 mx-2'>{errors.invalidCred.message}</div>}
            {errors.password && <div className='text-red-600 mx-2'>{errors.password.message}</div>}
          </div>
          <div>
            <input type="submit" value="Login" disabled={isSubmitting} className={classes} />
          </div>
        </div>
      </form>
      <div className='text-white text-[16px] sm:text-lg'>Dont have an account? <Link to="../signup" className='underline'>Signup</Link></div>
    </div>
  </motion.div>

  return (
    <Page content={content} extraClass="flex justify-center items-center" />
  )
}

export default Login
