import {Search,TextAlignJustify,Album,SearchCheck,Dices,X,BookPlus} from 'lucide-react'
import {  useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Logo from '../assets/Log.png'

import BorrowedDue from '../Components/BorrowedDue'
import WaitingList from '../Components/WaitingList'
import BorrowedList from '../Components/BorrowedList'
import ActivityLog from '../Components/ActivityLog'
export default function Home() {

  const [Tab,setTab] = useState(1);

  const [hammenu, setHammenu] = useState(false);

  const [AddBookForm, setAddBookForm] = useState(false);
  
  const [search,setSearch] = useState('');

  const handleHamMenu = () => {
    setHammenu(!hammenu);
  }

  const navigate = useNavigate();


  return (
    <div className='' >
      {AddBookForm && <BookForm close={() => setAddBookForm(false)}/>}
      {/* Header */}
      <div className="flex items-center justify-between gap-24 p-4 px-12">

        <div className='flex items-center gap-2'>
          <img src={Logo} className="w-10 rounded-lg " alt="logo" />
          <h1 className='font-medium text-2xl'>
            <span className='text-blue-500'>Literar</span><span>ium</span> 
          </h1>
        </div>

        

        <div className='flex-center gap-8'>
            <div className='border border-gray-300 p-2 px-4 rounded-md flex-center '>
              <input onChange={(e) => setSearch(e.target.value)} value={search}  type="text" placeholder='Search for anything...' className='w-[400px] outline-0 placeholder:text-gray-400 ' />
              <button onClick={() => navigate(`/search/${search}`)} className='text-gray-400 hover:text-gray-600 anim-btn'>
                <Search size={18} strokeWidth={3}  className=''/>
              </button>
            </div>
            <Link to={'/search'}>
              <button className='btn anim-btn'>Browse</button>
            </Link>
            
        </div>

        <div onClick={handleHamMenu}>
          {hammenu ? <X  className='anim-btn text-gray-400 hover:text-gray-600 ' /> : <TextAlignJustify className='anim-btn text-gray-400 hover:text-gray-600 ' />}  
          {hammenu && <SideTab addBook={() => setAddBookForm(true)} />}
        </div>
      </div>



      {/* Body */}
      <div className='mt-4 flex flex-col w-full'>


          <div className='grid grid-cols-4 gap-10 w-full px-20 mt-4'>
            <div onClick={() => setTab((1))} className={`anim-btn cursor-pointer hover:bg-gray-50 ${Tab === 1 ? 'bg-blue-100' : ''}  p-4 flex items-center  gap-2 border border-gray-200 rounded-lg shadow-sm  font-bold`}>
              <Album  size={60} className='bg-blue-200 text-blue-600 p-4 rounded-lg' />
              <h2 className='text-2xl text-blue-500'>Home</h2>
            </div>

            <div onClick={() => setTab((2))} className={`anim-btn cursor-pointer hover:bg-gray-50 ${Tab === 2 ? 'bg-blue-100' : ''}  p-4 flex items-center  gap-2 border border-gray-200 rounded-lg shadow-sm  font-bold`}>
              <Album  size={60} className='bg-blue-200 text-blue-600 p-4 rounded-lg' />
              <h2 className='text-2xl text-blue-500'>Borrowed </h2>
            </div>

            <div onClick={() => setTab((3))} className={`anim-btn cursor-pointer hover:bg-gray-50 ${Tab === 3 ? 'bg-blue-100' : ''}  p-4 flex items-center  gap-2 border border-gray-200 rounded-lg shadow-sm  font-bold`}>
              <SearchCheck  size={60} className='bg-blue-200 text-blue-600 p-4 rounded-lg' />
              <h2 className='text-2xl text-blue-500'>Activity Log</h2>
            </div>

            <div onClick={() => setTab((4))} className={`anim-btn cursor-pointer hover:bg-gray-50 ${Tab === 4 ? 'bg-blue-100' : ''}  p-4 flex items-center  gap-2 border border-gray-200 rounded-lg shadow-sm  font-bold`}>
              <Dices size={60} strokeWidth={40} className='bg-blue-200 text-blue-600 p-4 rounded-lg' />
              <h2 className='text-2xl text-blue-500'>to be claimed</h2>
            </div>

          </div>
           {Tab === 1 && <BorrowedDue/>}
           {Tab === 2 && <BorrowedList/>}
           {Tab === 3 && <ActivityLog/>}
           {Tab === 4 && <WaitingList/>}

      </div>
    </div>
  )
}

function SideTab({addBook}){
  return(
    <div className='absolute z-10 top-13 right-13 flex flex-col gap-2 border-gray-400 shadow-sm bg-white p-4 px-6 rounded-lg'>
      <h2 className='font-bold text-blue-500 '>Settings</h2>
      <ul className='w-3xs flex flex-col gap-2'>
        <li onClick={addBook} className=' flex items-center gap-1 text-sm text-blue-500 font-semibold cursor-pointer hover:bg-gray-50 border-2 border-blue-300 p-2 px-4 rounded-lg'><BookPlus size={18}/>Add Book</li>
        <li className=' flex items-center gap-1 text-sm text-blue-500 font-semibold cursor-pointer hover:bg-gray-50 border-2 border-blue-300 p-2 px-4 rounded-lg'><BookPlus size={18}/>Add Book</li>
        <li className=' flex items-center gap-1 text-sm text-blue-500 font-semibold cursor-pointer hover:bg-gray-50 border-2 border-blue-300 p-2 px-4 rounded-lg'><BookPlus size={18}/>Add Book</li>
      </ul>
    </div>
  )
}

function BookForm({ close }) {

  const [Shelf, setShelf] = useState("A");
  const [Section, setSection] = useState("1");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    pages: "",
    description: "",
    isAvailable: "true",
    genre: "",
    coverImage: "",
    isbn: "",
    currentBorrowerId: "N/A",
    location: "", // will update dynamically
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update location whenever Shelf or Section changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      location: `${Shelf}${Section}`,
    }));
  }, [Shelf, Section]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.coverImage) {
      formData.coverImage = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
    }

    fetch('/books/add', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Book added successfully!");
        console.log(data);
        close();
      })
      .catch((err) => alert("Fetch error: " + err));
  };

  const sections = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const shelves = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i)); // A-J

  return (
    <div className="fixed motion-preset-fade-sm inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full motion-preset-pop max-w-2xl border border-gray-200 bg-white rounded-2xl p-8 shadow-lg relative">
        <h2 className="text-2xl font-bold text-blue-500 text-center mb-6">Add New Book</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Title & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. The Great Gatsby"
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
                placeholder="e.g. F. Scott Fitzgerald"
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
              <label className="text-sm font-medium text-gray-600 mb-1">Year Published</label>
              <input
                type="text"
                name="year"
                placeholder="e.g. 1925"
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
                placeholder="e.g. 218"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.pages}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ISBN & Genre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">ISBN</label>
              <input
                type="text"
                name="isbn"
                placeholder="e.g. 978-3-16-148410-0"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Genre</label>
              <input
                type="text"
                name="genre"
                placeholder="e.g. Fiction"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.genre}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section & Shelf */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Section</label>
              <select
                name="section"
                value={Section}
                onChange={(e) => setSection(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                {sections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Shelf</label>
              <select
                name="shelf"
                value={Shelf}
                onChange={(e) => setShelf(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                {shelves.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">Description</label>
            <textarea
              rows="4"
              name="description"
              placeholder="Enter a short book summary..."
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              value={formData.description}
              onChange={handleChange}
              required
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
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


