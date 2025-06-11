import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
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
      axios.get(`http://localhost:3000/myItems?email=${user.email}`)
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
        axios.delete(`http://localhost:3000/items/${id}`)
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

  axios.put(`http://localhost:3000/addItems/${editingItem._id}`, {
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
                    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded" />
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full space-y-4">
            <h3 className="text-xl font-semibold mb-2">Update Item</h3>
            <img src={editingItem.imageUrl} alt="Preview" className="w-24 h-24 rounded object-cover" />
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
                onChange={(date) => setEditingItem({ ...editingItem, date })}
                className="input input-bordered w-full"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-success">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyItems;

