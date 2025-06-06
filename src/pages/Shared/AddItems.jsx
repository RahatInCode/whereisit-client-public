import React from 'react';
import { Plus } from 'lucide-react'; 

const AddItems = () => {
    return (
        <div className="bg-emerald-50 min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8 space-y-6">

                <div>
                    <h1 className="font-extrabold text-3xl text-gray-800">Add Lost or Found Items</h1>
                    <p className="text-gray-600">Help others by posting details about lost or found items.</p>
                </div>

                {/* Type */}
                <div>
                    <label className="block font-semibold mb-1">Type</label>
                    <select defaultValue="" className="select select-bordered w-full">
                        <option disabled value="">Select Type</option>
                        <option>Lost</option>
                        <option>Found</option>
                    </select>
                </div>

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input type="text" className="input input-bordered w-full" placeholder="e.g. Lost Wallet at Park" />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea className="textarea textarea-bordered w-full h-24" placeholder="Describe the item and where it was lost/found..."></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select defaultValue="" className="select select-bordered w-full">
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
                    <input type="date" className="input input-bordered w-full" />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input type="text" className="input input-bordered w-full" placeholder="e.g. Dhanmondi Lake Park" />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block font-semibold mb-1">Image URL</label>
                    <input type="url" className="input input-bordered w-full" placeholder="Paste image link..." />
                </div>

                {/* Contact Name */}
                <div>
                    <label className="block font-semibold mb-1">Contact Name</label>
                    <input type="text" className="input input-bordered w-full" placeholder="Your name..." />
                </div>

                {/* Contact Email */}
                <div>
                    <label className="block font-semibold mb-1">Contact Email</label>
                    <input type="email" className="input input-bordered w-full" placeholder="you@example.com" />
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
    );
};

export default AddItems;
