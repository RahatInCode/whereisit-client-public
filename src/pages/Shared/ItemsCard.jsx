import React from 'react';

const ItemsCard = ({ items }) => {
  const {
    _id,
    title,
    description,
    category,
    imageURL,
    status,
    location: {
      type: locationType,
      coordinates: [longitude, latitude]
    }
  } = items;

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <figure className="h-56 overflow-hidden">
        <img
          src={imageURL}
          alt={title || "Item image"}
          className="w-full h-full object-cover"
        />
      </figure>

      
      

      <div className="card-body p-4">
        <h2 className="card-title flex items-center justify-between">
          {title}
          {status?.toLowerCase() === 'new' && (
            
            <div className="badge badge-secondary ml-2">NEW</div>
          )}
        </h2>

        <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-3">
          {description || "No description available."}
        </p>

        <div className="card-actions justify-start flex flex-wrap gap-2">
          {/* Dynamic badges based on category and location */}
          {category && (
            <div className="badge badge-outline capitalize">{category}</div>
          )}
          {locationType && (
            <div className="badge badge-outline capitalize">{locationType}</div>
          )}
        </div>

        {/* Bonus: Location coordinates */}
        <div className="mt-3 text-xs text-gray-400">
          📍 Lat: {latitude.toFixed(3)}, Long: {longitude.toFixed(3)}
        </div>
        <div className="mt-3 text-xs text-gray-400">
          <a href={`/items/${_id}`} className="text-blue-500 hover:underline">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
