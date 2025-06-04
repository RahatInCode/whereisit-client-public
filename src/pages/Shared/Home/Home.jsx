import React from 'react';
import Banner from './Banner';
import Stats from './Stats';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Stats></Stats>
           <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;