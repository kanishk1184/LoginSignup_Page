import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { animate, motion } from 'framer-motion';

const Welcome = () => {
    const {name} = useParams();
    useEffect(()=>{
      document.title = "Welcome";
    }, []);
  return (
    <>
      <div className='text-white w-screen h-screen flex items-center justify-center text-lg sm:text-4xl font-bold p-10 text-center' >
        <h1>Why would you come here {name}?</h1>
      </div>
      <motion.div className='fixed top-0 left-0 w-full h-screen bg-black origin-bottom' initial={{scaleY: 1}} animate={{scaleY: 0}} transition={{duration: 1, ease: [0.22, 1, 0.36, 1]}}>
      </motion.div>
    </>

  )
}

export default Welcome
