import { Link } from 'react-router-dom'
import { ChevronRight,ArchiveRestore,SquarePen } from 'lucide-react'
import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { formatLocalDateTime } from '../assets/Dateformat';
import { statusStyles } from '../assets/Filter';
import { ValidID } from '../assets/Data';

export default function View() {

  const [isOpen, setIsOpen] = useState(false);

  const {isbn} = useParams();

  const [book, setBook] = useState({});

  const [UpdateBook, setUpdateBook] = useState(false);

  const navigate = useNavigate();

  const [filteredBooks, setFilteredBooks] = useState([]);


  const loadBooks = async () => {
    fetch(`/books/getbook/${isbn}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setBook(data);
        loadQueue(data.isbn);
      })
      .catch(err => console.error("Fetch error:", err));
  };

  const loadQueue = async (isbn) => {
    fetch(`/borrow/queue/${isbn}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setFilteredBooks(data);
      })
      .catch(err => console.error("Fetch error:", err));
  } 

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


const [pickUpModal, setPickUpModal] = useState(false);
const [selectedBook, setSelectedBook] = useState(null);
const [returnModal, setReturnModal] = useState(false);
const [DetailsModal, setDetailsModal] = useState(false);

function handleOpen(book) {

  if(book.status !== "Reserved – Pick Up"){
    setSelectedBook(book);
    setDetailsModal(true);
    return;
  }
  setSelectedBook(book);
  setPickUpModal(true);
}

function handleClose() {
  setDetailsModal(false);
  setPickUpModal(false);
  setSelectedBook(null);
}


const [cancelModal, setCancelModal] = useState(false);



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
                <span className="text-green-600 font-bold">{book.isAvailable == "true" ? "Available" : "Unavailable"}({book.availableBooks})</span>
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
          {cancelModal && <CancelForm close={() => setCancelModal(false)} loadBooks={loadBooks} book={book}/>}
          {returnModal && <ReturnForm close={() => setReturnModal(false)} loadBooks={loadBooks}/>}

        </div>

        <div className="mt-4 flex-center flex-col  gap-8 border border-gray-300 rounded-lg p-8 shadow-sm bg-white">
          <div className='grid grid-cols-3  w-full '>
            <div >
              <button onClick={() => setReturnModal(true)} className='btn anim-btn px-8'>
                Return Book
              </button>
            </div>
              <h2 className='font-bold text-2xl text-center'>Borrower Queue</h2>
            <div className='flex-center justify-end'>
              <button onClick={() => setCancelModal(true)} className='btn anim-btn bg-red-500 hover:bg-red-600'>
                Cancel Reservation
              </button>
            </div>
          </div>

          {selectedBook?.status === "Reserved – Pick Up" && pickUpModal && <PickupBook book={selectedBook} close={() => handleClose()} loadBooks={loadBooks}/>}
          {DetailsModal && <TransactionDetails book={book} selectedBook={selectedBook} close={() => setDetailsModal(false)}/>}
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-100 text-blue-700 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Book Title</th>
                <th className="px-4 py-3">Borrower Name</th>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Borrowed Date</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <tr
                    key={index}
                    onClick={() => handleOpen(book)}
                    className={`${book.status == "Borrowed" && "bg-green-200" } border-b border-gray-100 hover:bg-blue-50 transition`}
                  >
                    
                    <td className="px-4 py-3 font-medium text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <img
                        src={book.coverImage}
                        alt="Book cover"
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">{book.title}</span>
                        <span className="text-xs text-gray-500 italic">
                          {book.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{book.borrowerName}</td>
                    <td className="px-4 py-3">{book.transactionId}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {(() => {
                        const dateTime = formatLocalDateTime(book.borrowDate);
                        return (
                          <div className="flex flex-col items-start">
                            <span>{dateTime.date}</span>
                            <span>{dateTime.time}</span>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {(() => {
                        const dateTime = formatLocalDateTime(book.dueDate);
                        return (
                          <div className="flex flex-col items-start">
                            <span>{dateTime.date}</span>
                            <span>{dateTime.time}</span>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`${statusStyles[book.status]} px-2 py-1 rounded-full text-xs font-medium`}>
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-6 italic"
                  >
                    No borrowed books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}


function ReturnForm({ close, loadBooks, book }) {
  const [transactionId, setTransactionId] = useState("");

  const returnBook = (e) => {
    e.preventDefault();
    fetch(`/borrow/returnBook/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        alert("Book returned successfully");
        loadBooks();
        close();
      })
      .catch(err => alert("Fetch error:", err));
  };

  return (
    <div className="motion-preset-fade-sm fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full motion-preset-pop max-w-md border border-gray-200 bg-white rounded-2xl p-6 shadow-lg relative">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Return Book
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the transaction ID below to return a book.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={returnBook}>
          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. TXN-486bfdd0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition"
            >
              Return
            </button>
          </div>
        </form>

        {/* Footer note */}
        <div className="mt-4 text-sm text-gray-500 italic">
          Make sure the transaction ID is correct before returning.
        </div>
      </div>
    </div>
  );
}

function CancelForm({ close, loadBooks, book }) {
  const [transactionId, setTransactionId] = useState("");

  const cancelReservation = async (e) => {
    e.preventDefault(); // get event
    fetch(`/borrow/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({isbn: book.isbn, transactionId: transactionId}), // or add { isbn: book.isbn } if you have book object
    })
      .then((data) => {
        alert("Reservation cancelled successfully!");
        loadBooks();
        close();
      })
      .catch((err) => alert("Fetch error: " + err));
  };

  return (
    <div className="motion-preset-fade-sm fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full motion-preset-pop max-w-md border border-gray-200 bg-white rounded-2xl p-6 shadow-lg relative">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Cancel Transaction
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the transaction ID below to cancel a borrowing transaction.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={cancelReservation}>
          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. TXN-486bfdd0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              onClick={close}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm transition"
            >
              Confirm Cancel
            </button>
          </div>
        </form>

        {/* Footer note */}
        <div className="mt-4 text-sm text-gray-500 italic">
          Make sure the transaction ID is correct before confirming cancellation.
        </div>
      </div>
    </div>
  );
}


function Form({ close,book,loadBooks }) {


  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerAddress, setBorrowerAddress] = useState('');
  const [borrowerContact, setBorrowerContact] = useState('');

  const [duration, setDuration] = useState(1);
  const [numofBooks, setNumofBooks] = useState(1);
  const [remarks, setRemarks] = useState('');
  const [idNUmber, setIdNumber] = useState('');
  const [idType, setIdType] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();

    const shortId = `TXN-${uuidv4().split('-')[0]}`;


    fetch(`/borrow/add/${numofBooks}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        year: book.year,
        isbn: book.isbn,
        coverImage: book.coverImage, //waiting, Borrowed, returned, overdue
        borrowerName: borrowerName,
        borrowerAddress: borrowerAddress,
        borrowerContact: borrowerContact,
        borrowerIdNumber: idNUmber,
        borrowerIdType: idType,
        transactionId: shortId,
        duration: duration,
        remarks: remarks,
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

          <div className='grid grid-cols-2 gap-4'>
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

            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col'>
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Duration 
                </label>
                <select value={duration} onChange={(e)=> setDuration(e.target.value)} className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none'  name="" id="">
                  {[1,2,3,4,5,6,7].map((item) => (
                    <option key={item} value={item}>{item} days</option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col'>
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Books 
                </label>
                <select
                  value={numofBooks}
                  onChange={(e) => setNumofBooks(e.target.value)}
                  className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none'
                >
                  {Array.from({ length: book.availableBooks }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} books
                    </option>
                  ))}
                </select>
              </div>

              
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                ID Number
              </label>
              <input
                type="text"
                onChange={(e) => setIdNumber(e.target.value)}
                value={idNUmber}
                placeholder="e.g. 2024-001234"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <div className='flex flex-col'>
              <label className="text-sm font-medium text-gray-600 mb-1">
                ID Type
              </label>
              <select value={idType} onChange={(e)=> setIdType(e.target.value)} className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none'  name="" id="">
                <option value="">Select ID type</option>
                {ValidID.map((item,index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
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
              className="anim-btn btn bg-red-500 hover:bg-red-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="anim-btn btn"
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
              className="anim-btn btn bg-red-500 hover:bg-red-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="anim-btn btn"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



function PickupBook({ book, close, loadBooks }) {
  const transactionId = book.transactionId; // ✅ use actual book transactionId

  const pickUp = async () => {
    fetch(`/borrow/pickUp/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        alert("Book picked up successfully!");
        loadBooks();
        close(); // ✅ close modal after success
      })
      .catch(err => alert("Fetch error:", err));
  };

  return (
    <div className="motion-preset-fade-sm fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full motion-preset-pop max-w-2xl border border-gray-200 bg-white rounded-2xl p-8 shadow-lg relative">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Pickup Book</h2>
          <h3 className="text-blue-500 text-xl font-bold">{book.transactionId}</h3>
        </div>

        <p className="text-gray-600 mb-6">Please review the book and borrower details before confirming pickup:</p>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Book Details</h3>
          <div className="flex items-start gap-5">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-24 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
            />
            <div className="flex flex-col gap-2 text-gray-700">
              <p><span className="font-semibold text-gray-800">Title:</span> {book.title}</p>
              <p><span className="font-semibold text-gray-800">Author:</span> {book.author}</p>
              <p><span className="font-semibold text-gray-800">ISBN:</span> {book.isbn}</p>
              <p><span className="font-semibold text-gray-800">Year:</span> {book.year}</p>
            </div>
          </div>
        </div>


        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Borrower Details</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <p><span className="font-semibold text-gray-800">Name:</span> {book.borrowerName}</p>
            <p><span className="font-semibold text-gray-800">Contact #:</span> {book.borrowerContact}</p>
            <p><span className="font-semibold text-gray-800">Address:</span> {book.borrowerAddress}</p>
            <p><span className="font-semibold text-gray-800">ID Number:</span> {book.borrowerIdNumber}</p>
            <p><span className="font-semibold text-gray-800">ID Type:</span> {book.borrowerIdType}</p>
          </div>
        </div>


        <div className="flex justify-end gap-3 ">
          <button
            onClick={close}
            className="anim-btn btn bg-red-500 hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={pickUp}
            className="anim-btn btn "
          >
            Confirm Pickup
          </button>
        </div>

      </div>
    </div>

  );
}

function TransactionDetails({ book, close, selectedBook}) {

  const pay = () => {
    fetch(`/borrow/payPenalty/${selectedBook.transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((data) => {
        alert("Payment settled successfully!");
        loadBooks();
        close();
      })
      .catch(err => console.log(err));
  }


  return (
    <div className="motion-preset-fade-sm fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full motion-preset-pop max-w-2xl border border-gray-200 bg-white rounded-2xl p-8 shadow-lg relative">

        {selectedBook.status === "Overdue" && selectedBook.penalty === "200" &&
          <div className="absolute top-30 right-4 w-[300px] bg-red-100 border border-red-400 text-red-800 rounded-md p-4 w-80 shadow-md">
            <p className="text-sm mb-3">
              Please settle payment before returning the book. This book is overdue.
            </p>
            <div>
            <button
              onClick={pay}
              className="px-3 py-1 bg-red-600 text-white rounded font-semibold anim-btn hover:bg-red-700 text-sm"
            >
              Settle payment
            </button>
            </div>
          </div>
        }

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Transaction Details</h2>
          <h3 className="text-blue-500 text-xl font-bold">{selectedBook.transactionId}</h3>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Book Details</h3>
          <div className="flex items-start gap-5">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-24 h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
            />
            <div className="flex flex-col gap-2 text-gray-700">
              <p><span className="font-semibold text-gray-800">Title:</span> {book.title}</p>
              <p><span className="font-semibold text-gray-800">Author:</span> {book.author}</p>
              <p><span className="font-semibold text-gray-800">ISBN:</span> {book.isbn}</p>
              <p><span className="font-semibold text-gray-800">Year:</span> {book.year}</p>
            </div>
          </div>
        </div>


        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Borrower Details</h3>
          <div className="flex flex-col gap-2 text-gray-700">
            <p><span className="font-semibold text-gray-800">Name:</span> {selectedBook.borrowerName}</p>
            <p><span className="font-semibold text-gray-800">Contact #:</span> {selectedBook.borrowerContact}</p>
            <p><span className="font-semibold text-gray-800">Address:</span> {selectedBook.borrowerAddress}</p>
            <p><span className="font-semibold text-gray-800">ID Number:</span> {selectedBook.borrowerIdNumber}</p>
            <p><span className="font-semibold text-gray-800">ID Type:</span> {selectedBook.borrowerIdType}</p>
          </div>
        </div>


        <div className="flex justify-end gap-3 ">
          <button
            onClick={close}
            className="anim-btn btn bg-gray-500 hover:bg-gray-600"
          >
            Close
          </button>
        </div>

      </div>
    </div>

  );
}


