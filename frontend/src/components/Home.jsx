import React from 'react'
import { Link } from 'react-router-dom'
import Page from './Page'
import { motion } from 'framer-motion';

const Home = () => {
    const content = <motion.div className='w-full h-full flex flex-col gap-20 items-center justify-center' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 2.5, type: 'spring', stiffness: 50}}>
            <h1 className="text-center text-2xl text-white font-bold lg:text-3xl w-[95%]">Boom baam Chim chaam</h1>
            <div className="options flex flex-col items-center gap-5 w-full lg:justify-around lg:gap-0 lg:flex-row">
            <Link to="/login"><div className='loginBtn text-[#646262] w-52 h-14 rounded-3xl font-medium flex items-center justify-center text-xl hover:bg-[#fc0322] hover:text-white transition-all duration-200'>Login</div></Link>
            <Link to="/signup"><div className='signupBtn text-[#646262] w-52 h-14 rounded-3xl font-medium flex items-center justify-center text-xl hover:bg-[#31ec2b] hover:text-white transition-all duration-200'>SignUp</div></Link>
            </div>
    </motion.div>
  return (
    <Page content={content}/>
  )
}

export default Home
