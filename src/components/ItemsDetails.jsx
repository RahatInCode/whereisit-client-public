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
      
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>
        
      </div>
    </div>
  );
};

export default ItemsDetails;
