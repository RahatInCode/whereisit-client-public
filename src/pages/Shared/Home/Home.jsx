import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import Banner from './Banner';
import Stats from './Stats';
import HowItWorks from './HowItWorks';
import FramerMotion from './FramerMotion';
import ItemsCard from '../ItemsCard';
import SuccessStories from './SuccessStories';

const Home = () => {
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    document.title = "Home | WhereIsIt";
  }, []);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const res = await fetch('https://whereisit-server-side-eta.vercel.app/addItems');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setRecentItems(data);
      } catch (err) {
        console.error('Failed to fetch recent items', err);
      }
    };
    fetchRecentItems();
  }, []);

  return (
    <div className='bg-emerald-50 dark:bg-gray-900 dark:text-gray-200 min-h-screen transition-colors duration-300'>
      <Banner />
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold my-10 transition-colors duration-300">Welcome to Our Community!</h1>
        <p className="mb-10 max-w-3xl mx-auto transition-colors duration-300">
          Search for your lost items, connect with others, and help reunite people with their belongings.
          <br />
          Join us in making a difference by sharing your lost and found items with the community.
        </p>
        <FramerMotion />

        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-6 text-center transition-colors duration-300">Recently Added Items</h2>
          {recentItems.length === 0 ? (
            <div className="text-center text-gray-700 dark:text-gray-400 transition-colors duration-300">
              <p>No recent items found.</p>
              <p className="mt-2">Be the first to add a lost or found item!</p>
              <NavLink to="/addItems" className="btn btn-primary mt-4 inline-block transition-colors duration-300">
                Add an Item
              </NavLink>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentItems.map(item => (
                <ItemsCard key={item._id} items={item} />
              ))}
            </div>
          )}

          <div className="mt-6 text-center">
            <NavLink
              to="/LostFound"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold underline underline-offset-4 transition-colors duration-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
              }
            >
              <button className="btn btn-accent transition-colors duration-300">All Items</button>
            </NavLink>
          </div>
        </section>
      </div>
      <Stats />
      <HowItWorks />
      <SuccessStories />
    </div>
  );
};

export default Home;
