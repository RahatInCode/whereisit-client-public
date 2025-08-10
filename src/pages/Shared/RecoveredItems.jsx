import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FiGrid, FiList, FiCheckCircle } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

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
        setError("");
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

  if (loading)
    return (
      <div className="flex justify-center py-10 bg-base-100 dark:bg-base-200 transition-colors duration-300">
        <span className="loading loading-spinner text-secondary"></span>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-10 bg-base-100 dark:bg-base-200 transition-colors duration-300">
        {error}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-base-100 dark:bg-base-200 rounded-lg transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4 flex items-center text-base-content transition-colors duration-300">
        <FiCheckCircle className="text-green-500 mr-2" /> All Recovered Items
      </h1>
      <p className="text-base-content/70 mb-6 transition-colors duration-300">
        Items that have been successfully recovered
      </p>

      {/* Layout Toggle */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => handleLayoutChange("grid")}
          className={`btn flex items-center transition-colors duration-300 ${
            layoutView === "grid"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
          }`}
        >
          <FiGrid className="mr-2" /> Grid View
        </button>
        <button
          onClick={() => handleLayoutChange("table")}
          className={`btn flex items-center transition-colors duration-300 ${
            layoutView === "table"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
          }`}
        >
          <FiList className="mr-2" /> Table View
        </button>
      </div>

      {/* No Items */}
      {recoveredItems.length === 0 ? (
        <p className="text-center text-base-content/70 transition-colors duration-300">
          No recovered items yet.
        </p>
      ) : layoutView === "table" ? (
        // 🧾 TABLE VIEW
        <div className="overflow-x-auto rounded-lg shadow bg-base-100 dark:bg-base-300 transition-colors duration-300">
          <table className="w-full border-collapse text-base-content transition-colors duration-300">
            <thead>
              <tr className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-semibold transition-colors duration-300">
                <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Title</th>
                <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Recovered By</th>
                <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Recovery Date</th>
                <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Recovery Location</th>
                <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Original Owner</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <td className="p-4 border-b border-gray-300 dark:border-gray-700">{item.originalItemData?.title || "Untitled"}</td>
                  <td className="p-4 border-b border-gray-300 dark:border-gray-700">{item.recoveredBy?.name || "Unknown"}</td>
                  <td className="p-4 border-b border-gray-300 dark:border-gray-700">
                    {item.claimInfo?.claimedAt
                      ? new Date(item.claimInfo.claimedAt).toLocaleDateString()
                      : "Not Available"}
                  </td>
                  <td className="p-4 border-b border-gray-300 dark:border-gray-700">{item.claimInfo?.lostLocation || "Unknown"}</td>
                  <td className="p-4 border-b border-gray-300 dark:border-gray-700">{item.claimInfo?.fullName || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // 🗂️ GRID VIEW
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-base-100 dark:bg-base-300 shadow rounded-lg space-y-2 transition-colors duration-300"
            >
              <h2 className="text-lg font-semibold flex items-center text-base-content transition-colors duration-300">
                <FiCheckCircle className="text-green-500 mr-2" /> {item.originalItemData?.title || "Untitled"}
              </h2>
              <p className="text-base-content/80 transition-colors duration-300">
                <strong>Recovered By:</strong> {item.recoveredBy?.name || "Unknown"}
              </p>
              <p className="text-base-content/80 transition-colors duration-300">
                <strong>Date:</strong> {item.claimInfo?.claimedAt ? new Date(item.claimInfo.claimedAt).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-base-content/80 transition-colors duration-300">
                <strong>Location:</strong> {item.claimInfo?.lostLocation || "Unknown"}
              </p>
              <p className="text-base-content/80 transition-colors duration-300">
                <strong>Owner:</strong> {item.claimInfo?.fullName || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveredItems;


