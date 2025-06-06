import React from 'react';
import Banner from './Banner';
import Stats from './Stats';
import HowItWorks from './HowItWorks';
import FramerMotion from './FramerMotion';

const Home = () => {
    return (
        <div className='bg-emerald-50 min-h-screen'>
           <Banner></Banner>
           <div>
                <h1 className="text-5xl font-bold text-center my-10">Welcome to Our Community!</h1>
                <p className="text-center mb-10">
                    Search for your lost items, connect with others, and help reunite people with their belongings.
                    <br />
                    Join us in making a difference by sharing your lost and found items with the community.
                </p>
                <FramerMotion></FramerMotion>
           </div>
           <Stats></Stats>
           <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;