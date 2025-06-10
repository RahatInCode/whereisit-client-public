import React, { use, useState } from 'react';
import { Plus } from 'lucide-react'; 
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';



const AddItems = () => {
const { user } = use(AuthContext)
const {id: itemId} = useParams





    const handleFormData = (e) =>{
        e.preventDefault();
        const form = e.target;
        const type = form.type.value;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const date = form.date.value;
        const location = form.location.value;
        const name = form.name.value;
        const email = form.email.value;
        const imageUrl = form.imageUrl.value;

        console.log(type,title,description,category,date,location,name,email,imageUrl);

        const addItems = {
            itemId,
            item:user.email,
            type,
            title,
            description,
            category,
            date,
            location,
            name,
            email,
            imageUrl
        }

axios.post('http://localhost:3000/addItems', addItems)
.then(res => {
    console.log(res.data);
    if(res.data.insertedId){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Item has been added!",
            showConfirmButton: false,
            timer: 1500
        });
    }
}).catch(error => {
    console.log(error);
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
});
})
        
    }
     const [date, setDate] = useState(new Date());
    return (
    <form onSubmit={handleFormData}>
            <div className="bg-emerald-50 min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8 space-y-6">

                <div>
                    <h1 className="font-extrabold text-3xl text-gray-800">Add Lost or Found Items</h1>
                    <p className="text-gray-600">Help others by posting details about lost or found items.</p>
                </div>

                {/* Type */}
                <div>
                    <label className="block font-semibold mb-1">Type</label>
                    <select name='type' defaultValue="" className="select select-bordered w-full">
                        <option disabled value="">Select Type</option>
                        <option>Lost</option>
                        <option>Found</option>
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input name='title' type="text" className="input input-bordered w-full" placeholder="e.g. Lost Wallet at Park" />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea name='description' className="textarea textarea-bordered w-full h-24" placeholder="Describe the item and where it was lost/found..."></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select name='category' defaultValue="" className="select select-bordered w-full">
                        <option disabled value="">Select Category</option>
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
      <label className="block font-semibold mb-1">Date</label>
      <DatePicker
  selected={date}
  name='date'
  onChange={(newDate) => setDate(newDate)}
  dateFormat="dd/MM/yyyy"
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
  maxDate={new Date()}
  placeholderText="Select date"
/>
    </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input type="text" name='location' className="input input-bordered w-full" placeholder="e.g. Dhanmondi Lake Park" />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block font-semibold mb-1">Image URL</label>
                    <input type="url" name='imageUrl' className="input input-bordered w-full" placeholder="Paste image link..." />
                </div>

                {/* Contact Name */}
                <div>
                    <label className="block font-semibold mb-1">Contact Name</label>
                    <input type="text" name='name' className="input input-bordered w-full" placeholder="Your name..." />
                </div>

                {/* Contact Email */}
                <div>
                    <label className="block font-semibold mb-1">Contact Email</label>
                    <input type="email" name='email' className="input input-bordered w-full" placeholder="you@example.com" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center ">
                    <button className="btn btn-success flex items-center gap-2">
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
