import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import animationData from '../assets/Animation - 1749125602040.json';
import ItemsCard from '../pages/Shared/ItemsCard';

const LostFoundItems = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "All items | WhereIsIt";
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://whereisit-server-side-eta.vercel.app/allItems');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to load items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const refreshItems = () => {
    fetchItems();
  };

  if (loading) {
    return (
      <div className='bg-base-100 dark:bg-base-200 min-h-screen flex items-center justify-center'>
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-base-100 dark:bg-base-200 min-h-screen flex items-center justify-center'>
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
          <button
            className="btn btn-sm btn-outline"
            onClick={fetchItems}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 dark:bg-base-200 min-h-screen">
      <div className="pt-8 pb-4">
        <h1 className="text-3xl font-bold text-center text-base-content dark:text-base-content">
          Lost and Found Items
        </h1>
      </div>

      <Lottie
        loop={true}
        autoplay={true}
        animationData={animationData}
        className="w-96 mx-auto mb-8"
      />

      <div className='flex flex-col md:flex-row justify-between items-center gap-4 p-4 max-w-6xl mx-auto'>
        <label className="input input-bordered flex items-center gap-2 w-full md:w-auto bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content">
          <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow bg-transparent text-base-content dark:text-base-content"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered w-full md:w-auto bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
        >
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Personal Items</option>
          <option>Pets</option>
          <option>Keys</option>
          <option>Bags</option>
          <option>Others</option>
        </select>

        <button
          onClick={refreshItems}
          className="btn btn-outline btn-primary"
        >
          Refresh
        </button>
      </div>

      <div className='max-w-6xl mx-auto p-4'>
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-base-content dark:text-base-content/80">
            {items.length === 0 ? 'No items found.' : 'No items match your search criteria.'}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-sm btn-ghost mt-2"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
            {filteredItems.map(item => (
              <ItemsCard key={item._id} items={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LostFoundItems;





