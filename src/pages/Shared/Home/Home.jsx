import React from 'react';
import Banner from './Banner';
import Stats from './Stats';
import HowItWorks from './HowItWorks';
import FramerMotion from './FramerMotion';
import  { useState, useEffect } from 'react';
import ItemsCard from '../ItemsCard';
import { NavLink } from 'react-router';




const Home = () => {
    const [recentItems, setRecentItems] = useState([]);

useEffect(() => {
    const fetchRecentItems = async () => {
        try {
            const res = await fetch('https://whereisit-server-side-eta.vercel.app/addItems');
            const data = await res.json();
            const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const topSix = sorted.slice(0, 6);
            setRecentItems(topSix);
        } catch (err) {
            console.error("Failed to fetch recent items", err);
        }
    };

    fetchRecentItems();
}, []);

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

                <div className="max-w-6xl mx-auto px-4 py-8">
    <h2 className="text-3xl font-semibold mb-6 text-center">Recently Added Items</h2>
    {recentItems.length === 0 ? (
        <p className="text-center text-gray-500">No recent items found.</p>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentItems.map(item => (
    <ItemsCard key={item._id} items={item} />
))}

        </div>
    )}

    <div className='mt-6'>
        <button className='btn btn-accent'>
            <NavLink
        to="/LostFound"
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline underline-offset-4"
            : "text-gray-700 hover:text-orange-500 transition"
        }
      >
        All Items
      </NavLink>
        </button>
    </div>
</div>

           </div>
           <Stats></Stats>
           <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;