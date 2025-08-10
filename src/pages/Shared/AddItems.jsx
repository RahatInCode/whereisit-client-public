import React, { use, useEffect, useState } from 'react';
import { Plus } from 'lucide-react'; 
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';


const AddItems = () => {
const [isAdding, setIsAdding] = useState(false);
  useEffect(() => {
  document.title = isAdding ? "Adding Item... | WhereIsIt" : "Add Item | WhereIsIt";
}, [isAdding]);

    const { user } = use(AuthContext)
    const {id: itemId} = useParams();
    const [date, setDate] = useState(new Date());

    const handleFormData = (e) => {
        e.preventDefault();
        const form = e.target;
        const type = form.type.value.trim();
        const title = form.title.value.trim();
        const description = form.description.value.trim();
        const category = form.category.value.trim();
        const location = form.location.value.trim();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const imageUrl = form.imageUrl.value.trim();

        if (!type || !title || !description || !category || !location || !name || !email || !imageUrl) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in all required fields!",
            });
            return;
        }

      
        const addItems = {
            itemId,
            item: user.email,
            status: type,
            title,
            description,
            category,
            date: date.toISOString(),
            location: {
                name: location,
                type: "manual", 
                coordinates: [] 
            },
            reporterName: name,
            email,
            imageURL: imageUrl 
        }

        //  backend endpoint for adding items
        axios.post("https://whereisit-server-side-eta.vercel.app/addItems", addItems)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Item has been added!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    form.reset();
                    setIsAdding(false);
                    setDate(new Date()); 
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to add item. Please try again.",
                });
            });
    }

    return (
       // inside return JSX

<form onSubmit={handleFormData}>
  <div className="bg-base-100 dark:bg-base-200 min-h-screen flex items-center justify-center p-6">
    <div className="w-full max-w-2xl bg-base-100 dark:bg-base-300 shadow-md rounded-xl p-8 space-y-6">
      
      <div>
        <h1 className="font-extrabold text-3xl text-base-content dark:text-base-content">
          Add Lost or Found Items
        </h1>
        <p className="text-base-content/70 dark:text-base-content/80">
          Help others by posting details about lost or found items.
        </p>
      </div>

      {/* Type */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Type
        </label>
        <select
          name="type"
          defaultValue=""
          onChange={() => setIsAdding(true)}
          className="select select-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
        >
          <option disabled value="">
            Select Type
          </option>
          <option>Lost</option>
          <option>Found</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Title
        </label>
        <input
          name="title"
          onChange={() => setIsAdding(true)}
          type="text"
          className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
          placeholder="e.g. Lost Wallet at Park"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Description
        </label>
        <textarea
          onChange={() => setIsAdding(true)}
          name="description"
          className="textarea textarea-bordered w-full h-24 bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
          placeholder="Describe the item and where it was lost/found..."
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Category
        </label>
        <select
          onChange={() => setIsAdding(true)}
          name="category"
          defaultValue=""
          className="select select-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
        >
          <option disabled value="">
            Select Category
          </option>
          <option>Electronics</option>
          <option>Personal Items</option>
          <option>Pets</option>
          <option>Keys</option>
          <option>Bags</option>
          <option>Others</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Date
        </label>
        <DatePicker
          selected={date}
          name="date"
          onChange={(newDate) => setDate(newDate)}
          dateFormat="dd/MM/yyyy"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
          maxDate={new Date()}
          placeholderText="Select date"
          // For dark mode on react-datepicker, consider custom CSS (I'll add below)
        />
      </div>

      {/* Location */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Location
        </label>
        <input
          onChange={() => setIsAdding(true)}
          type="text"
          name="location"
          className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
          placeholder="e.g. Dhanmondi Lake Park"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Image URL
        </label>
        <input
          onChange={() => setIsAdding(true)}
          type="url"
          name="imageUrl"
          className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
          placeholder="Paste image link..."
        />
      </div>

      {/* Contact Name */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Name
        </label>
        <input
          type="text"
          onChange={() => setIsAdding(true)}
          name="name"
          className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
          defaultValue={user.displayName}
          disabled
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-semibold mb-1 text-base-content dark:text-base-content">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-base-content"
          defaultValue={user.email}
          disabled
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button type="submit" className="btn btn-success flex items-center gap-2">
          <Plus size={18} />
          Add Post
        </button>
      </div>
    </div>
  </div>
</form>

    );
};

export default AddItems; 



