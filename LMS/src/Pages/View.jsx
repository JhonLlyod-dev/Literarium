import { Link } from 'react-router-dom'
import { ChevronRight,ArchiveRestore,SquarePen } from 'lucide-react'
import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

export default function View() {

  const [isOpen, setIsOpen] = useState(false);

  const {id} = useParams();

  const [book, setBook] = useState({});

  const [UpdateBook, setUpdateBook] = useState(false);

  const navigate = useNavigate();


  const loadBooks = async () => {
    fetch(`/books/getbook/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setBook(data);
      })
      .catch(err => console.error("Fetch error:", err));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const deleteBook = async () => {
      fetch(`/books/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(data => {
          alert(" Book deleted successfully!");
          navigate('/search');
        })
        .catch(err => alert("Fetch error:", err));
    };



  const Details = (
          <div className="flex flex-col w-full border border-gray-200 rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-gray-600 italic mb-2">by <span className="font-semibold text-gray-700">{book.author}</span></p>
            <p className="text-sm text-gray-500 mb-4">
              Published by <span className="font-medium text-gray-700">Literarium 2024</span> · 
              ISBN <span className="font-medium text-gray-700">{book.isbn}</span> · 
              Language <span className="font-medium text-gray-700">English</span>
            </p>

            {/* Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Book Summary</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {book.description}
              </p>
            </div>

            {/* Info Grid */}
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Book Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Genre</span>
                <span className="text-gray-700 font-bold">{book.genre}</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Published Year</span>
                <span className="text-gray-700 font-bold">{book.year}</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Pages</span>
                <span className="text-gray-700 font-bold">{book.pages}</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Availability</span>
                <span className="text-green-600 font-bold">{book.isAvailable == "true" ? "Available" : "Unavailable"}</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Library Section</span>
                <span className="text-gray-700 font-bold">{book.location}</span>
              </div>

              <div className="flex flex-col items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
                <span className="text-xs text-gray-500">Borrowed Times</span>
                <span className="text-gray-700 font-bold">{book.borrowedTimes}</span>
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
        <span className="text-gray-600 hover:text-gray-800 hover:underline font-medium ">View Book</span>
      </div>

      {/* Main Content */}
      <div className="p-4 px-20">
        <div className='flex justify-between items-center'>
          <h2 className="text-3xl font-bold text-blue-500 mb-6">View Book</h2>
          <div className='flex-center gap-2 '>
            <button onClick={()=> setUpdateBook(true)} className="btn anim-btn text-sm flex gap-2 items-center mt-4 w-fit bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 rounded-md py-2">
              Edit <SquarePen size={16} strokeWidth={2.5}/>
            </button>
            <button onClick={deleteBook}  className="btn anim-btn text-sm flex gap-2 items-center mt-4 w-full bg-red-500 text-white hover:bg-red-600 transition-all duration-200 rounded-md py-2">
              Archive <ArchiveRestore size={16} strokeWidth={2.5}/>
            </button>
          </div>
          
        </div>
        

        <div className="mt-4 flex flex-col md:flex-row gap-8 border border-gray-300 rounded-lg p-8 shadow-sm bg-white">
          {/* Left - Book Cover */}
          <div className="border flex-1/4 flex flex-col items-center justify-between w-full md:w-72 border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50">
            <img src={book.coverImage} className="w-full h-80 object-cover bg-blue-50 rounded-md" alt="Book cover" />

              <button onClick={() => setIsOpen(true)} className="btn mt-4 w-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 rounded-md py-2">
                Reserve this Book
              </button>

          </div>

          {/* Right - Book Details */}
          {Details}
          {isOpen && <Form book={book} close={()  => setIsOpen(false)} loadBooks={loadBooks} />}
          {UpdateBook && <UpdateBookForm load={loadBooks} book={book} close={() => setUpdateBook(false)}/>}

        </div>
      </div>
    </div>
  )
}


function Form({ close,book,loadBooks }) {


  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerAddress, setBorrowerAddress] = useState('');
  const [borrowerContact, setBorrowerContact] = useState('');

  const [duration, setDuration] = useState('');
  const [remarks, setRemarks] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();

    const shortId = `TXN-${uuidv4().split('-')[0]}`;

    fetch(`/borrow/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        year: book.year,
        isbn: book.isbn,
        coverImage: book.coverImage,
        status: "Borrowed", //waiting, Borrowed, returned, overdue
        borrowerName: borrowerName,
        borrowerAddress: borrowerAddress,
        borrowerContact: borrowerContact,
        transactionId: shortId,
        duration: duration,
        claimExpiryDate: "N/A",
        isClaimed: "false",
        remarks: remarks,
        borrowDate: "N/A",
        dueDate: "N/A"
      })
    })
    .then(data => {
      alert("Book borrowed successfully!");
      loadBooks();
      close();
    })
    .catch((error) => {
      alert('Error:', error);
    });
  }
  


  return (
    <div className="motion-preset-fade-sm fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full motion-preset-pop max-w-md border border-gray-200 bg-white rounded-2xl p-6 shadow-lg relative">
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-6">
          Borrow Book Form
        </h2>

        {/* Form Fields */}
        {/* {Add auto Date and Time of borrowdate  the return date is dropdown then auto calculate when is the return date;} */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) => setBorrowerName(e.target.value)}
              value={borrowerName}
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
              onChange={(e) => setBorrowerAddress(e.target.value)}
              value={borrowerAddress}
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
              onChange={(e) => setBorrowerContact(e.target.value)}
              value={borrowerContact}
              placeholder="e.g. 09123456789"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className='flex flex-col'>
            <label className="text-sm font-medium text-gray-600 mb-1">
              Borrow Duration 
            </label>
            <select value={duration} onChange={(e)=> setDuration(e.target.value)} className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none'  name="" id="">
              {[1,2,3,4,5,6,7].map((item) => (
                <option key={item} value={item}>{item} days</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Remarks
            </label>
            <textarea
              rows="3"
              onChange={(e) => setRemarks(e.target.value)}
              value={remarks}
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


 function UpdateBookForm({ load,book, close,}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    pages: "",
    description: "",
    isAvailable: "true",
    genre: "",
    isbn: "",
    location: "",
  });

  // Update form data when book changes
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        year: book.year || "",
        pages: book.pages || "",
        description: book.description || "",
        isAvailable: book.isAvailable || "true",
        genre: book.genre || "",
        isbn: book.isbn || "",
        location: book.location || "",
      });
    }
  }, [book]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/books/update/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update book");

      alert("Book updated successfully!");
      load(); 
      close();
    } catch (err) {
      alert("Fetch error: " + err.message);
    }
  };

  return (
    <div className="fixed motion-preset-fade-sm inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full motion-preset-pop max-w-2xl border border-gray-200 bg-white rounded-2xl p-8 shadow-lg relative">
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-6">
          Update Book
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Title & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Title</label>
              <input
                type="text"
                name="title"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Author</label>
              <input
                type="text"
                name="author"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Year & Pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Year</label>
              <input
                type="text"
                name="year"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Pages</label>
              <input
                type="number"
                name="pages"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.pages}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ISBN & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">ISBN</label>
              <input
                type="text"
                name="isbn"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Available</label>
              <select
                name="isAvailable"
                value={formData.isAvailable}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Genre & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Genre</label>
              <input
                type="text"
                name="genre"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Location</label>
              <input
                type="text"
                name="location"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Description</label>
            <textarea
              rows="4"
              name="description"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
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
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

