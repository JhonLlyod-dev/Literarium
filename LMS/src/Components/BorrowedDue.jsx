import { books } from '../assets/Data'
import { Album } from 'lucide-react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import {formatLocalDateTime} from "../assets/Dateformat";
import { statusStyles } from "../assets/Filter";

export default function BorrowedDue() {
  const currentDate = dayjs().format('MMMM D, YYYY');

  const [borrowed, setBorrowed] = useState([]);

  const getDueToday = () => {
    fetch("/borrow/dueToday", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBorrowed(data);
        console.log(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  useEffect(() => {
    getDueToday();
  }, []);

  return (
    <div className="mt-4 flex-center gap-4 w-full p-4 px-8">
      <div className="w-full  rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold  text-lg text-gray-700 flex items-center gap-2">
            <Album className="text-blue-600" size={20} /> Books Due Today
          </h2>
          <span className="text-sm text-gray-500">{currentDate}</span>
        </div>

        {/* Table */}
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
            {borrowed.length > 0 ? (
              borrowed.map((book, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-blue-50 transition"
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
                      const dateTime = formatLocalDateTime(book.borrowedDate);
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
                    <span className={`${statusStyles[book.status]} bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium`}>
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
  )
}

