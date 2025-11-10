import {Search,TextAlignJustify,Album,SearchCheck,Dices} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Log.png'

import BorrowedDue from '../Components/BorrowedDue'
import WaitingList from '../Components/WaitingList'
import BorrowedList from '../Components/BorrowedList'
import ActivityLog from '../Components/ActivityLog'
export default function Home() {

  const [Tab,setTab] = useState(1);


  return (
    <div className='' >
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
              <input  type="text" placeholder='Search for anything...' className='w-[400px] outline-0 placeholder:text-gray-400 ' />
              <button className='text-gray-400 hover:text-gray-600 anim-btn'>
                <Search size={18} strokeWidth={3}  className=''/>
              </button>
            </div>
            <Link to={'/search'}>
              <button className='btn anim-btn'>Browse</button>
            </Link>
            
        </div>

        <div>
          <TextAlignJustify className='anim-btn text-gray-400 hover:text-gray-600 ' />
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
              <h2 className='text-2xl text-blue-500'>Waiting list</h2>
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