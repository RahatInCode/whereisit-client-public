import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const ItemsDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/addItems/${id}`)
      .then(res => {
        setItem(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load item details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 space-y-6">
      
      {/* IMAGE */}
      {item?.imageURL ? (
        <img
          src={item.imageURL}
          alt={item.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
          No image available
        </div>
      )}

      {/* TEXT INFO */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 break-words">{item?.title || "Untitled Item"}</h1>
        
         <div>
  <span
    className={`inline-block px-4 py-1 text-xs font-semibold rounded-full ${
      item?.status === 'Lost'
        ? 'bg-red-100 text-red-600'
        : 'bg-green-100 text-green-600'
    }`}
  >
    {item?.status || "Unknown"}
  </span>
</div>

        
        <p className="text-gray-600 mb-4 break-words">
          {item?.description || "No description provided."}
        </p>

        

        {/* Meta Info */}
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-red-500">
  📍 {item?.location?.name || "Location not specified"}
</p>

          <p className="flex items-center gap-2 text-blue-500">
            📅 {item?.date || "Date not specified"}
          </p>
          <p className="flex items-center gap-2 text-green-600">
            🧑 {item?.name || "Anonymous"}
          </p>
          <p className="flex items-center gap-2 text-purple-600">
            ✉️ {item?.email ? (
              <a href={`mailto:${item.email}`} className="underline">{item.email}</a>
            ) : "No email provided"}
          </p>
        </div>
      </div>

      {/* BUTTON */}
      <button
  className={`w-full py-2 rounded text-white font-semibold transition-all ${
    item?.status === 'Lost' ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'
  }`}
>
  {item?.status === 'Lost' ? 'I found this' : 'This is mine'}
</button>
    </div>
  );
};

export default ItemsDetails;


