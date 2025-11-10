
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight,Search } from 'lucide-react'
import { books } from '../assets/Data'


export default function SearchBook() {

  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-4 '>
        <div className="border border-gray-200 shadow-xs text-xs  flex items-center gap-2 w-full p-2 px-8">
          <Link to={'/'} className='text-gray-600 hover:text-gray-800 hover:underline'>Home  </Link > <ChevronRight  size={15}/>
          <Link to={'/search'} className='text-gray-600 hover:text-gray-800 hover:underline'>Search Book</Link>
        </div>

        <div className='p-4 px-30'>
          <h2 className='text-3xl font-bold text-blue-500'>Search Book</h2>
          <div className='flex gap-8'>
            <div className='mt-8 border border-gray-300 p-2 px-4 rounded-md flex-center '>
              <input  type="text" placeholder='Search for anything...' className='w-2xl outline-0 placeholder:text-gray-400 ' />
              <button className='text-gray-400 hover:text-gray-600 anim-btn'>
                <Search size={18} strokeWidth={3}  className=''/>
              </button>
            </div>


          </div>

            <div className='ml-4 mt-4 flex gap-2 '>
              <span className='text-gray-600 font-bold'>099</span> 
              <span>hits</span>
            </div>

            <div className='mt-8 grid grid-cols-3 gap-4'>

              {books.map((book,index) => (
                <div
                  key={index}
                  onClick={() => navigate('/view')}
                  className=" hover:bg-blue-50 border flex gap-4 items-start border-gray-300 shadow-xs rounded-lg p-4 "
                >

                  {/* Book Cover */}
                  <div className="shrink-0">
                    <img
                      src={`https://picsum.photos/200/300?random=${++index}`}
                      className="w-30 h-40 bg-amber-200 object-cover rounded"
                      alt="book cover"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex flex-col justify-between flex-1 h-40">
                    <div className="overflow-hidden">
                      <h2 className="font-semibold text-lg line-clamp-2">{book.title}</h2>
                      <p className="text-sm text-gray-600">{book.genre}</p>
                      <p className="text-sm mt-2 text-gray-500 line-clamp-3">{book.description}</p>
                    </div>

                    <div className="flex w-full font-medium justify-between items-center gap-2 mt-4">
                      <span className="text-xs font-semibold w-fit py-1 px-2 border-2 rounded-full border-green-500 text-green-500 ">
                        {book.status}
                      </span>

                      <div className='flex gap-1'>
                          <span className="text-xs text-gray-600">{book.author || "Unknown"}</span>
                          <span className="text-xs text-gray-600">|</span>
                          <span className="text-xs text-gray-600">{book.year}</span>
                      </div>

                    </div>

                  </div>
                </div>
              ))}



            </div>
        </div>
    </div>
  )
}