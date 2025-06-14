import React, { useState,  useEffect, use } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { AuthContext } from "../contexts/AuthContext";
import axios from 'axios';
import Swal from 'sweetalert2';

const ItemsDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
const { user } = use(AuthContext);
  const params = useParams();
  
  const loaderData = useLoaderData();

  useEffect(() => {
    // If we have loader data, use it
    if (loaderData && Object.keys(loaderData).length > 0) {
      setItem(loaderData);
      setLoading(false);
    } 
    // Otherwise, fetch the item using the ID from params
    else if (params.id) {
      fetchItemDetails(params.id);
    }
    // If no loader data and no params, try to get from URL
    else {
      const urlParts = window.location.pathname.split('/');
      const itemId = urlParts[urlParts.length - 1];
      if (itemId) {
        fetchItemDetails(itemId);
      } else {
        setLoading(false);
      }
    }
  }, [loaderData, params.id]);

  const fetchItemDetails = async (itemId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/items/${itemId}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load item details. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the correct image URL property
  const getImageUrl = () => {
    if (!item) return '';
    return item.imageURL || item.imageUrl || item.image_url || '';
  };

  // Handle location data (could be string or object)
  const getLocationDisplay = () => {
    if (!item || !item.location) return 'Location not specified';
    
    const { location } = item;
    if (typeof location === 'string') {
      return location;
    }
    if (location.name) {
      return location.name;
    }
    if (location.coordinates && location.coordinates.length >= 2) {
      const [longitude, latitude] = location.coordinates;
      return `Lat: ${latitude?.toFixed(4)}, Long: ${longitude?.toFixed(4)}`;
    }
    return 'Location not specified';
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const claimerName = form.claimerName.value.trim();
    const claimerEmail = form.claimerEmail.value.trim();
    const claimReason = form.claimReason.value.trim();

    if (!claimerName || !claimerEmail || !claimReason) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all fields',
      });
      setIsSubmitting(false);
      return;
    }

    const claimData = {
      claimerName,
      claimerEmail,
      claimReason,
      claimType: item.status === 'Lost' ? 'found' : 'owner',
    };

    try {
      const response = await axios.post(`http://localhost:3000/items/${item._id}/claim`, claimData);
      
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Claim Submitted!',
          text: 'Your claim has been submitted successfully. The item owner will be notified.',
        });
        
        // Close the modal
        document.getElementById('claim_modal').close();
        form.reset();
      } else {
        throw new Error('Failed to submit claim');
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit claim. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 flex justify-center items-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 text-center">
        <div className="alert alert-error">
          <span>Item not found or failed to load.</span>
        </div>
      </div>
    );
  }

  const {
    _id,
    title,
    description,
    category,
    status,
    date,
    reporterName,
    email,
  } = item;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        {getImageUrl() ? (
          <img
            src={getImageUrl()}
            alt={title || 'Item image'}
            className="w-full rounded-xl object-cover max-h-96"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
            }}
          />
        ) : (
          <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>No image available</p>
            </div>
          </div>
        )}
      </div>

      <div className="md:w-1/2 flex flex-col gap-3">
        {status && (
          <span className={`text-sm font-semibold px-3 py-1 rounded-full w-fit ${
            status.toLowerCase() === 'lost' 
              ? 'bg-red-100 text-red-600' 
              : status.toLowerCase() === 'found'
              ? 'bg-green-100 text-green-600'
              : 'bg-blue-100 text-blue-600'
          }`}>
            {status}
          </span>
        )}
        
        <h2 className="text-2xl font-bold text-gray-800">
          {title || 'Untitled Item'}
        </h2>
        
        <p className="text-gray-600 leading-relaxed">
          {description || 'No description available.'}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <i className="fas fa-map-marker-alt text-red-500"></i>
            <span>{getLocationDisplay()}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <i className="fas fa-calendar-alt text-blue-500"></i>
            <span>
              {date ? new Date(date).toLocaleDateString() : 'Date not specified'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <i className="fas fa-user text-green-500"></i>
            <span>{reporterName || 'Anonymous'}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <i className="fas fa-envelope text-purple-500"></i>
            <a 
              href={`mailto:${email}`} 
              className="underline text-blue-600 hover:text-blue-800"
            >
              {email || 'No email provided'}
            </a>
          </div>
        </div>

        {category && (
          <div className="mt-2">
            <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
              {category}
            </span>
          </div>
        )}

        {/* Show claim button only if user is logged in and it's not their own item */}
        {user && user.email !== email && (
          <button
            className="btn btn-primary mt-4"
            onClick={() => document.getElementById('claim_modal').showModal()}
          >
            {status === 'Lost' ? 'I Found This Item' : 'This is Mine'}
          </button>
        )}

        {/* Show message if it's user's own item */}
        {user && user.email === email && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-sm">This is your own item.</p>
          </div>
        )}

        {/* Show message if user is not logged in */}
        {!user && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700 text-sm">Please log in to claim this item.</p>
          </div>
        )}

        {/* Claim Modal */}
        <dialog id="claim_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            
            <h3 className="font-bold text-lg mb-4">Claim This Item</h3>
            <p className="py-2 text-gray-600 mb-4">
              {status === 'Lost'
                ? "You're about to claim this item as found. Please provide your details and explain how you found it."
                : "You're about to claim this item as yours. Please provide your details and explain why this item belongs to you."}
            </p>

            <form onSubmit={handleClaimSubmit} className="space-y-4">
              <input
                type="text"
                name="claimerName"
                placeholder="Your full name"
                className="input input-bordered w-full"
                defaultValue={user?.displayName || user?.name || ''}
                required
              />
              
              <input
                type="email"
                name="claimerEmail"
                placeholder="Your email address"
                className="input input-bordered w-full"
                defaultValue={user?.email || ''}
                required
              />
              
              <textarea
                name="claimReason"
                placeholder={status === 'Lost' 
                  ? "Describe how and where you found this item..." 
                  : "Explain why this item belongs to you (provide identifying details)..."
                }
                className="textarea textarea-bordered w-full h-24"
                required
              ></textarea>
              
              <button
                type="submit"
                className={`btn btn-success w-full ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Claim'}
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ItemsDetails;
