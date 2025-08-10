import React from 'react';
import { motion } from "framer-motion";
import groupImg1 from '../../../assets/images/meeting-designers.jpg';
import groupImg2 from '../../../assets/images/team-working-together-project.jpg';

const FramerMotion = () => {
  return (
   <div className="hero bg-emerald-50 min-h-screen px-4 py-5">
  <div className="hero-content flex flex-col lg:flex-row items-center justify-center lg:gap-0 gap-4">
    
    {/* First Motion Image */}
    <motion.div
      animate={{ y: [70, 30, 0] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      className="relative z-10"
    >
      <img
        src={groupImg1}
        alt="Designers Meeting"
        className="w-full max-w-xs sm:max-w-sm rounded-t-4xl rounded-br-4xl shadow-2xl border-l-8 border-b-8 border-blue-600"
      />
    </motion.div>

    {/* Second Motion Image */}
    <motion.div
      animate={{ x: [0, 50, 0] }}
      transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      className="relative -ml-6 lg:-ml-12"
    >
      <img
        src={groupImg2}
        alt="Team Working"
        className="w-full max-w-xs sm:max-w-sm rounded-t-4xl rounded-br-4xl shadow-2xl border-l-8 border-b-8 border-blue-600"
      />
    </motion.div>
  </div>
</div>

  );
};

export default FramerMotion;
