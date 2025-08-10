import React from 'react';
import { motion } from "framer-motion";
import groupImg1 from '../../../assets/images/meeting-designers.jpg';
import groupImg2 from '../../../assets/images/team-working-together-project.jpg';

const FramerMotion = () => {
  return (
    <div className="hero bg-emerald-50 min-h-screen px-4 py-5">
      <div className="hero-content flex flex-col lg:flex-row gap-10 items-center justify-center">
        
        {/* First Motion Image */}
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <img
            src={groupImg1}
            alt="Designers Meeting"
            className="max-w-xs sm:max-w-sm rounded-t-4xl rounded-br-4xl shadow-2xl border-l-8 border-b-8 border-blue-600"
          />
        </motion.div>

        {/* Second Motion Image */}
        <motion.div
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <img
            src={groupImg2}
            alt="Team Working"
            className="max-w-xs sm:max-w-sm rounded-t-4xl rounded-br-4xl shadow-2xl border-l-8 border-b-8 border-blue-600"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FramerMotion;
