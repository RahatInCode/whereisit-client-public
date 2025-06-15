import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://whereisit-server-side-eta.vercel.app/myItems?email=${user.email}`)
        .then(res => {
          setMyItems(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching items', err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Item will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`https://whereisit-server-side-eta.vercel.app/items/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              setMyItems(myItems.filter(item => item._id !== id));
              Swal.fire('Deleted!', 'Item removed.', 'success');
            }
          });
      }
    });
  };

  const handleEditClick = (item) => {
    setEditingItem({
      ...item,
      date: new Date(item.date)
    });
    setShowModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://whereisit-server-side-eta.vercel.app/addItems/${editingItem._id}`, {
      title: editingItem.title,
      category: editingItem.category,
      date: editingItem.date,
      type: editingItem.type
    })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          setMyItems(prev =>
            prev.map(item =>
              item._id === editingItem._id ? { ...item, ...editingItem } : item
            )
          );
          Swal.fire('Updated!', 'Your item info has been updated.', 'success');
          setShowModal(false);
        }
      })
      .catch(err => {
        console.error('Update failed:', err);
      });
  };

  // Helper function to get the correct image URL property
  const getImageUrl = (item) => {
    return item.imageURL || item.imageUrl || item.image_url || '';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Posted Items</h2>

      {loading ? (
        <span className="loading loading-spinner text-secondary"></span>
      ) : myItems.length === 0 ? (
        <p className="italic text-gray-600">You haven't posted anything yet!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myItems.map(item => (
                <tr key={item._id}>
                  <td>
                    {getImageUrl(item) ? (
                      <img 
                        src={getImageUrl(item)} 
                        alt={item.title} 
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMjQgMjRMMzIgMzJMMzIgNDBIMjRWMjRaIiBmaWxsPSIjOUI5QkEwIi8+PHBhdGggZD0iTTMyIDI0TDQwIDMyVjQwSDMyVjI0WiIgZmlsbD0iIzZCNzI4MCIvPjwvc3ZnPg==';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Image</span>
                      </div>
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.type}</td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEditClick(item)} className="btn btn-sm btn-info mr-2">Update</button>
                    <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg max-w-lg w-full space-y-4 shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-2">Update Item</h3>
              {getImageUrl(editingItem) ? (
                <img 
                  src={getImageUrl(editingItem)} 
                  alt="Preview" 
                  className="w-24 h-24 rounded object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMzYgMzZMNDggNDhMNDggNjBIMzZWMzZaIiBmaWxsPSIjOUI5QkEwIi8+PHBhdGggZD0iTTQ4IDM2TDYwIDQ4VjYwSDQ4VjM2WiIgZmlsbD0iIzZCNzI4MCIvPjwvc3ZnPg==';
                  }}
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}
              <form onSubmit={handleUpdateSubmit} className="space-y-3">
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="input input-bordered w-full"
                />
                <select
                  value={editingItem.category}
                  onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option>Electronics</option>
                  <option>Personal Items</option>
                  <option>Pets</option>
                  <option>Keys</option>
                  <option>Bags</option>
                  <option>Others</option>
                </select>
                <select
                  value={editingItem.type}
                  onChange={e => setEditingItem({ ...editingItem, type: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option>Lost</option>
                  <option>Found</option>
                </select>
                <DatePicker
                  selected={new Date(editingItem.date)}
                  onChange={date => setEditingItem({ ...editingItem, date })}
                  className="input input-bordered w-full"
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Update</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyItems;

