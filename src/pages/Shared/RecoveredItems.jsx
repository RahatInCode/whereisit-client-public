import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FiGrid, FiList, FiCheckCircle } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import { getIdToken } from "firebase/auth";


const RecoveredItems = () => {
  const { user } = useContext(AuthContext);
  const [layoutView, setLayoutView] = useState(localStorage.getItem("layoutView") || "grid");
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Recovered items | WhereIsIt";
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const fetchClaimedItems = async () => {
      try {
        const res = await axios.get(`https://whereisit-server-side-eta.vercel.app/claimedItems?email=${user.email}`);
        setRecoveredItems(res.data);
      } catch (err) {
        console.error("Error fetching claimed items:", err);
        setError("Failed to load recovered items.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaimedItems();
  }, [user]);

  const handleLayoutChange = (view) => {
    setLayoutView(view);
    localStorage.setItem("layoutView", view);
  };

  if (loading) return <span className="loading loading-spinner text-secondary text-center py-10"></span>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <FiCheckCircle className="text-green-500 mr-2" /> All Recovered Items
      </h1>
      <p className="text-gray-600 mb-6">Items that have been successfully recovered</p>

      {/* Layout Toggle */}
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

      {/* No Items */}
      {recoveredItems.length === 0 ? (
        <p className="text-center text-gray-500">No recovered items yet.</p>
      ) : layoutView === "table" ? (
        // 🧾 TABLE VIEW
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800 font-semibold">
                <th className="p-4 text-left border-b">Title</th>
                <th className="p-4 text-left border-b">Recovered By</th>
                <th className="p-4 text-left border-b">Recovery Date</th>
                <th className="p-4 text-left border-b">Recovery Location</th>
                <th className="p-4 text-left border-b">Original Owner</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100 transition-all">
                  <td className="p-4 border-b">{item.originalItemData?.title || "Untitled"}</td>
                  <td className="p-4 border-b">{item.recoveredBy?.name || "Unknown"}</td>
                  <td className="p-4 border-b">
                    {item.claimInfo?.claimedAt
                      ? new Date(item.claimInfo.claimedAt).toLocaleDateString()
                      : "Not Available"}
                  </td>
                  <td className="p-4 border-b">{item.claimInfo?.lostLocation || "Unknown"}</td>
                  <td className="p-4 border-b">{item.claimInfo?.fullName || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // 🗂️ GRID VIEW
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div key={item._id} className="p-4 bg-white shadow rounded-lg space-y-2">
              <h2 className="text-lg font-semibold flex items-center">
                <FiCheckCircle className="text-green-500 mr-2" /> {item.originalItemData?.title || "Untitled"}
              </h2>
              <p><strong>Recovered By:</strong> {item.recoveredBy?.name || "Unknown"}</p>
              <p><strong>Date:</strong> {item.claimInfo?.claimedAt ? new Date(item.claimInfo.claimedAt).toLocaleDateString() : "N/A"}</p>
              <p><strong>Location:</strong> {item.claimInfo?.lostLocation || "Unknown"}</p>
              <p><strong>Owner:</strong> {item.claimInfo?.fullName || "Unknown"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveredItems;

