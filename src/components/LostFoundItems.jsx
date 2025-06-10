import React, { useState, useEffect } from 'react';
import ItemsCard from '../pages/Shared/ItemsCard';
import Lottie from "lottie-react";
import animationData from '../assets/Animation - 1749125602040.json'

const LostFoundItems = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
 



    const [items, setItems] = useState([]);
const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://whereisit-server-side-eta.vercel.app/items');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }
        fetchData();
    }, []);

     const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
    });

    return (
        <div className='bg-emerald-50 min-h-screen'>
           
             <h1 className="text-3xl font-bold text-center ">Lost and Found Items</h1>
            
           <Lottie loop={true} autoplay={true} animationData={animationData} className="w-96 mx-auto mb-8">

           </Lottie>



             <div className='flex flex-row justify-between items-center p-4 ml-30 mr-30'>
             <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" required placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
</label>
             <select 
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  className="select select-secondary"
>
  <option>All Categories</option>
  <option>Electronics</option>
  <option>Personal Items</option>
  <option>Pets</option>
  <option>Keys</option>
  <option>Bags</option>
</select>

           </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ml-30 mr-30'>
                
                {
                   filteredItems.map(item => <ItemsCard key={item._id} items={item} />)
                }

            </div>
        </div>
    );
};

export default LostFoundItems;
