import React from 'react';
import { motion } from "framer-motion";
import groupImg1 from '../../../assets/images/meeting-designers.jpg';
import groupImg2 from '../../../assets/images/team-working-together-project.jpg';
const FramerMotion = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-1 lg:flex-1">
 <div className='flex-2'>
  <div>
     <motion.img
      src={groupImg1}
      className="max-w-sm rounded-t-4xl rounded-br-4xl shadow-2xl border-l-blue-600 border-b-blue-600 
      border-l-8 border-b-8"
      animate={{y: [0,50,0]}}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      alt="Group Image"
   
    />
 </div>
    <div>
      <div>
    <motion.img
     src={groupImg2}
       className="max-w-sm rounded-t-4xl rounded-br-4xl shadow-2xl border-l-blue-600 border-b-blue-600 
      border-l-8 border-b-8"
        animate={{x: [100,150,100]}}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      alt="Group Image"
    /> 
    </div>
 </div>
    </div>
  </div>
  </div>
  );
};

export default FramerMotion;