import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiGrid, FiList, FiCheckCircle } from "react-icons/fi"; 

const RecoveredItems = () => {
  const [layoutView, setLayoutView] = useState(localStorage.getItem("layoutView") || "grid");
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaimedItems = async () => {
      try {
        const res = await axios.get("https://whereisit-server-side-eta.vercel.app/claimedItems");
        setRecoveredItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching claimed items:", err);
        setError("Failed to load recovered items.");
        setLoading(false);
      }
    };

    fetchClaimedItems();
  }, []);

  // Persist layout choice
  const handleLayoutChange = (view) => {
    setLayoutView(view);
    localStorage.setItem("layoutView", view);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <FiCheckCircle className="text-green-500 mr-2" /> All Recovered Items
      </h1>
      <p className="text-gray-600 mb-6">Items that have been successfully recovered</p>

      {/* Layout View Toggle Buttons */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => handleLayoutChange("grid")}
          className={`btn flex items-center ${layoutView === "grid" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          <FiGrid className="mr-2" /> Grid View
        </button>
        <button
          onClick={() => handleLayoutChange("table")}
          className={`btn flex items-center ${layoutView === "table" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          <FiList className="mr-2" /> Table View
        </button>
      </div>

      {/* No Items Message */}
      {recoveredItems.length === 0 ? (
        <p className="text-center text-gray-500">No recovered items yet.</p>
      ) : layoutView === "table" ? (
        /* Improved Table View */
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800 font-semibold">
                <th className="p-4 text-left border-b">Original Item</th>
                <th className="p-4 text-left border-b">Recovered By</th>
                <th className="p-4 text-left border-b">Recovery Date</th>
                <th className="p-4 text-left border-b">Recovery Location</th>
                <th className="p-4 text-left border-b">Original Owner</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map(item => (
                <tr key={item._id} className="hover:bg-gray-100 transition-all">
                  <td className="p-4 border-b">{item.originalItem}</td>
                  <td className="p-4 border-b">{item.fullName}</td>
                  <td className="p-4 border-b">{new Date(item.lostDate).toLocaleDateString()}</td>
                  <td className="p-4 border-b">{item.lostLocation}</td>
                  <td className="p-4 border-b">{item.fullName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recoveredItems.map(item => (
            <div key={item._id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold flex items-center">
                <FiCheckCircle className="text-green-500 mr-2" /> {item.originalItem}
              </h2>
              <p><strong>Recovered By:</strong> {item.fullName}</p>
              <p><strong>Date:</strong> {new Date(item.lostDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {item.lostLocation}</p>
              <p><strong>Owner:</strong> {item.fullName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveredItems;

