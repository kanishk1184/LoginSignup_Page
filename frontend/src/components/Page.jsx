import React from 'react'
import { motion } from 'framer-motion';

const Page = ({content, extraClass}) => {
  return (
      <div className='bgImg w-screen h-screen bg-cover flex items-center justify-center relative'>
        <motion.main className={"mainHome w-[90vw] lg:w-[50vw] h-[700px] border rounded-3xl backdrop-blur-[8px] "+extraClass} initial={{rotateY: '-180deg'}} animate={{rotateY: '0deg'}} transition={{ duration: 1, ease: 'easeOut', type: 'spring', stiffness: 50}} >
            {content}
        </motion.main>
    </div>
  )
}

export default Page
