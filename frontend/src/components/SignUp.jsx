import React, { useEffect, useState } from 'react'
import Page from './Page'
import { useForm } from "react-hook-form"
import { Link, useNavigate} from 'react-router-dom'
import { motion } from 'framer-motion';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [classes, setClasses] = useState('signupSubmit w-32 bg-white text-lg sm:text-xl font-medium rounded-full h-14 hover:cursor-pointer transition-all duration-200 disabled:bg-slate-400 disabled:text-slate-900 disabled:shadow-none disabled:cursor-default');

  useEffect(()=>{
    document.title = "SignUp";
  }, []);

  const onSubmit =async (data) => {
    const info = await fetch("https://loginsignup-page.onrender.com/signup", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const response = await info.json();
    if (response.code == 402){
      setError("invalidMail", {message: response.error});
    }
    else if (response.code == 404)
      setError("invalidName", {message: response.error});
    else{
      const prevClass = classes;
      setClasses(prevClass+' scale-[20] bg-black hover:text-black hover:cursor-default');
      // redirect with the given username
      setTimeout(()=>{
        navigate(`../welcome/${response.name}`);
      }, 500);
    }
  }

    const content = <motion.div className='w-full h-full flex justify-center items-center' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 2.5, type: 'spring', stiffness: 50}}>
    <div className="signUpMain flex flex-col w-[80%] sm:w-[45%] gap-10">
      <div className="headingSingUp flex flex-col gap-2">
        <h1 className='text-white text-2xl sm:text-4xl'>SignUp Form</h1>
        <div className='bg-white w-16 sm:w-28 h-1 rounded-full'></div>
      </div>
      <form onSubmit={(e)=>{
      clearErrors();
      handleSubmit(onSubmit)(e);
    }}>
        <div className="signupForm flex flex-col items-start gap-10">
          <div className="name w-full">
          <input type="text" {...register("username", {required: {value: true, message: "This field is required"}})} placeholder='Username' className='signupInput w-full h-14 rounded-full outline-none text-white px-5 placeholder:text-white text-[14px] sm:text-lg focus:placeholder:text-[12px] sm:focus:placeholder:text-sm placeholder:transition-all placeholder:duration-200'/>
          {errors.invalidName && <div className='text-red-600 mx-2'>{errors.invalidName.message}</div>}
          {errors.username && <div className='text-red-600 mx-2'>{errors.username.message}</div>}
          </div>
          <div className="mail w-full">
          <input type="email" {...register("email", {required: {value: true, message: "This field is required"}})} placeholder='Email' className='signupInput w-full h-14 rounded-full outline-none text-white px-5 placeholder:text-white text-[14px] sm:text-lg focus:placeholder:text-[12px] sm:focus:placeholder:text-sm placeholder:transition-all placeholder:duration-200'/>
          {errors.invalidMail && <div className='text-red-600 mx-2'>{errors.invalidMail.message}</div>}
          {errors.email && <div className='text-red-600 mx-2'>{errors.email.message}</div>}
          </div>
          <div className="pass w-full">
          <input type="password" {...register("password", {required: {value: true, message: "This field is require"},minLength: {value: 8, message: "Password must be atleast 8 letters"}})} placeholder='Password' className='signupInput w-full h-14 rounded-full outline-none text-white px-5 placeholder:text-white text-[14px] sm:text-lg focus:placeholder:text-[12px] sm:focus:placeholder:text-sm placeholder:transition-all placeholder:duration-200'/>
          {errors.password && <div className='text-red-600 mx-2'>{errors.password.message}</div>}
          </div>
          <input type="submit" value="SignUp" disabled={isSubmitting} className={classes}/>
        </div>
      </form>
      <div className='text-white text-[16px] sm:text-lg'>Already an account? <Link to="../login" className='underline'>Login</Link></div>
    </div>
    </motion.div>
  return (
    <Page content={content}/>
  )
}

export default SignUp
