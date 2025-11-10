import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react';

export default function View() {
  const img = `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`;

  const [isOpen, setIsOpen] = useState(false);

  const Details = (
          <div className="flex flex-col w-full border border-gray-200 rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Book Title Talagin</h1>
            <p className="text-gray-600 italic mb-2">by <span className="font-semibold text-gray-700">Author Name</span></p>
            <p className="text-sm text-gray-500 mb-4">
              Published by <span className="font-medium text-gray-700">Literarium 2024</span> · 
              ISBN <span className="font-medium text-gray-700">978-1234567890</span> · 
              Language <span className="font-medium text-gray-700">English</span>
            </p>

            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Book Summary</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            {/* Info Grid */}
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Book Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Genre</span>
                <span className="text-gray-700 font-bold">Fiction</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Published Year</span>
                <span className="text-gray-700 font-bold">2025</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Pages</span>
                <span className="text-gray-700 font-bold">389</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Availability</span>
                <span className="text-green-600 font-bold">Available</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Library Section</span>
                <span className="text-gray-700 font-bold">A-12</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Borrowed Times</span>
                <span className="text-gray-700 font-bold">209</span>
              </div>
            </div>
          </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <div className="border border-gray-200 shadow-xs text-xs flex items-center gap-2 w-full p-2 px-8 bg-gray-50 rounded-md">
        <Link to={'/'} className="text-gray-600 hover:text-gray-800 hover:underline">Home</Link> 
        <ChevronRight size={15} />
        <Link to={'/search'} className="text-gray-600 hover:text-gray-800 hover:underline">Search Book</Link>
        <ChevronRight size={15} />
        <Link to={'/view'} className="text-gray-600 hover:text-gray-800 hover:underline font-medium text-blue-600">View Book</Link>
      </div>

      {/* Main Content */}
      <div className="p-4 px-20">
        <h2 className="text-3xl font-bold text-blue-500 mb-6">View Book</h2>

        <div className="mt-4 flex flex-col md:flex-row gap-8 border border-gray-300 rounded-lg p-8 shadow-sm bg-white">
          {/* Left - Book Cover */}
          <div className="border flex-1/4 flex flex-col items-center justify-between w-full md:w-72 border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50">
            <img src={img} className="w-full h-80 object-cover bg-blue-50 rounded-md" alt="Book cover" />

              <button onClick={() => setIsOpen(true)} className="btn mt-4 w-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 rounded-md py-2">
                Borrow Book
              </button>

          </div>

          {/* Right - Book Details */}
          {Details}
          {isOpen && <Form close={()  => setIsOpen(false)} />}

        </div>
      </div>
    </div>
  )
}


function Form({ close }) {
  return (
    <div className="motion-preset-fade-sm fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full motion-preset-pop max-w-md border border-gray-200 bg-white rounded-2xl p-6 shadow-lg relative">
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-6">
          Borrow Book Form
        </h2>

        {/* Form Fields */}
        <form className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Juan Dela Cruz"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="e.g. Cagayan de Oro City"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="e.g. 09123456789"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Remarks
            </label>
            <textarea
              rows="3"
              placeholder="Additional notes (optional)..."
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-sm transition"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
