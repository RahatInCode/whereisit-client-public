import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';

const ItemsDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimStatus, setClaimStatus] = useState(null);

  useEffect(() => {
    axios.get(`https://whereisit-server-side-eta.vercel.app/addItems/${id}`)
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

 useEffect(() => {
  if (!user?.uid) return;

  axios
    .get(`https://whereisit-server-side-eta.vercel.app/claimedItems/status/${id}?uid=${user.uid}`)
    .then((res) => setClaimStatus(res.data))
    .catch((err) => console.error("Failed to fetch claim status", err));
}, [id, user]);


  if (loading) return <span className="loading loading-spinner text-secondary"></span>
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      itemId: item?._id,
      recoveredBy: {
        name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
        phone: event.target.phone.value,
      },
      originalItemData: {
        title: item?.title,
        imageURL: item?.imageURL,
        name: item?.name,
        email: item?.email,
        description: item?.description,
        location: item?.location,
        date: item?.date,
        recoveredDate: new Date().toISOString()
      },
      claimInfo: {
        fullName: event.target.fullName.value,
        description: event.target.description.value,
        lostDate: event.target.lostDate.value,
        lostLocation: event.target.lostLocation.value,
        proofImage: event.target.proofImage.files[0]?.name || null,
        claimedAt: new Date().toISOString(),
      }
    };

    axios.post("https://whereisit-server-side-eta.vercel.app/claimedItems", formData)
      .then(() => {
         Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "You successfully claimed this item!",
                                showConfirmButton: false,
                                timer: 1500,
                            });
        setIsModalOpen(false);
        setClaimStatus({ claimed: true, by: user.displayName, date: new Date().toISOString() });
      })
      .catch(() => {
        alert("Error submitting claim.");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-2xl shadow-md p-6 space-y-6">
      {item?.imageURL ? (
        <img src={item.imageURL} alt={item.title} className="w-full h-64 object-cover rounded-lg" />
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">No image available</div>
      )}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 break-words">{item?.title || "Untitled Item"}</h1>
        <div>
          <span className={`inline-block px-4 py-1 text-xs font-semibold rounded-full ${item?.status === 'Lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {item?.status || "Unknown"}
          </span>
        </div>
        <p className="text-gray-600 mb-4 break-words">{item?.description || "No description provided."}</p>

        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-red-500">📍 {item?.location?.name || "Location not specified"}</p>
          <p className="flex items-center gap-2 text-blue-500">📅 {item?.date || "Date not specified"}</p>
          <p className="flex items-center gap-2 text-green-600">🧑 {item?.name || "Anonymous"}</p>
          <p className="flex items-center gap-2 text-purple-600">✉️ {item?.email ? <a href={`mailto:${item.email}`} className="underline">{item.email}</a> : "No email provided"}</p>

          {claimStatus?.claimed && (
            <div className="bg-gray-100 p-4 rounded mt-4">
              <h3 className="font-bold text-sm mb-2">Already claimed by:</h3>
              <p>👤 {claimStatus.by} on {new Date(claimStatus.date).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>

      <button
  onClick={() => setIsModalOpen(true)}
  disabled={claimStatus?.claimed}
  className={`w-full py-2 rounded text-white font-semibold transition-all ${
    claimStatus?.claimed
      ? 'bg-gray-400 cursor-not-allowed'
      : item?.status === 'Lost'
        ? 'bg-green-600 hover:bg-green-700'
        : 'bg-indigo-600 hover:bg-indigo-700'
  }`}
>
  {claimStatus?.claimed ? 'You already claimed this' : 'Claim this item'}
</button>


      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">Claim This Item</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input type="text" name="name" className="input input-bordered w-full" defaultValue={user.displayName} disabled />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input type="email" name="email" className="input input-bordered w-full" defaultValue={user.email} disabled />
              </div>
              <input type="text" name="fullName" defaultValue={user.displayName} placeholder="Full Name" className="input input-bordered w-full mt-3 mb-3" required />
              <input type="tel" name="phone" placeholder="Phone Number" className="input input-bordered w-full mb-3" required />
              <input type="email" name="email" placeholder="Email (optional)" className="input input-bordered w-full mb-3" />
              <textarea name="description" placeholder="Describe the item to prove ownership" className="textarea textarea-bordered w-full mb-3" required />
              <input type="date" name="lostDate" className="input input-bordered w-full mb-3" required />
              <input type="text" name="lostLocation" placeholder="Where did you lose it?" className="input input-bordered w-full mb-3" required />
              <input type="file" name="proofImage" accept="image/*" className="file-input file-input-bordered w-full mb-3" />
              <button type="submit" className="btn btn-primary w-full">Submit Claim</button>
            </form>
            <div className="modal-action">
              <button onClick={() => setIsModalOpen(false)} className="btn">Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ItemsDetails; 



