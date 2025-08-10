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
      type: locationType = "unknown",
    } = {}
  } = items;

  return (
    <div className="card font-bold bg-base-100 w-full max-w-sm shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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

        <p className="flex items-center gap-2 text-red-500">
          📍 {items?.location?.name || "Location not specified"}
        </p>

       <div>
  <span className="text-sm font-semibold mr-2">Status:</span>
  <span
    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
      items?.status === 'Lost'
        ? 'bg-red-100 text-red-600'
        : items?.status === 'Recovered'
        ? 'bg-blue-100 text-blue-600'
        : 'bg-green-100 text-green-600'
    }`}
  >
    {items?.status || "Unknown"}
  </span>
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
