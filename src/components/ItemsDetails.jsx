import React from 'react';
import { useLoaderData } from 'react-router';


const ItemsDetails = () => {
  const {
    title,
    description,
    category,
    imageURL,
    status,
    location: { coordinates: [longitude, latitude] } = {},
    date,
    reporterName,
    email,
  } = useLoaderData() || {};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 flex flex-col md:flex-row gap-6">
      <img
        src={imageURL}
        alt={title}
        className="w-full md:w-1/2 rounded-xl object-cover"
      />
      <div className="flex flex-col gap-3">
        <span className={`text-sm font-semibold px-2 py-1 rounded-full w-fit ${status === 'Lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {status}
        </span>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center gap-2 text-gray-700">
          <i className="fas fa-map-marker-alt"></i>
          <span>{`Lat: ${latitude}, Long: ${longitude}`}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <i className="fas fa-calendar-alt"></i>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <i className="fas fa-user"></i>
          <span>{reporterName}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <i className="fas fa-envelope"></i>
          <a href={`mailto:${email}`} className="underline text-blue-600">{email}</a>
        </div>
        <span className="text-sm inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full mt-2">
          {category}
        </span>
      
          
<button
  className="btn btn-primary mt-4"
  onClick={() => document.getElementById('claim_modal').showModal()}
>
  {status === 'Lost' ? 'I Found This Item' : 'This is Mine'}
</button>

<dialog id="claim_modal" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Claim This Item</h3>
    <p className="py-2">
      {status === 'Lost'
        ? "You're about to claim this item as found."
        : "You're about to claim this item as yours."}
    </p>
    <input type="text" placeholder="Your name" className="input input-bordered w-full mb-2" />
    <input type="email" placeholder="Your email" className="input input-bordered w-full mb-2" />
    <textarea placeholder="Why do you believe this is yours?" className="textarea textarea-bordered w-full mb-2"></textarea>
    <button className="btn btn-success w-full">Submit Claim</button>
  </div>
</dialog>


        
      </div>
    </div>
  );
};

export default ItemsDetails;
