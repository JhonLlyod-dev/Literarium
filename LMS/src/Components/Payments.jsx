import { books } from "../assets/Data";
import dayjs from "dayjs";
import { Album } from "lucide-react";
import { useEffect, useState } from "react";
import { filterLog } from "../assets/Filter";
import {formatLocalDateTime} from "../assets/Dateformat";
import { statusStyles } from "../assets/Filter";

export default function Payment() {

    const [searchTerm, setSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
  
    const [log, setLog] = useState([]);

    const Paid = log.filter((item) => item.penalty === "Paid");

    const filtered = filterLog(Paid,searchTerm,filterDate);


  const getLog = async () => {
    fetch ("/borrow/getReturned", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLog(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  useEffect(() => {
    getLog();
  }, []);

  

  return (
    <div className="mt-4 flex-center gap-4 w-full p-4 px-8">
      <div className="w-full  rounded-lg shadow border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-bold  text-lg text-gray-700 flex items-center gap-2">
            <Album className="text-blue-600" size={20} /> Books Activity log
          </h2>
          <div className="flex-center gap-4">
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Transaction ID or Borrower Name" className="placeholder:text-gray-400 border border-gray-300 shadow-xs outline-0 rounded-lg p-2 pl-4 w-[350px]" name="" id="" />
            <div className="border border-gray-300 shadow-xs p-2 rounded-lg ">
              <span className="font-semibold text-sm text-gray-400">Date: </span>
              <input type="Date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="outline-0" />
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {dayjs().format("MMMM D, YYYY")}
          </span>
        </div>

        {/* Table add limitter and expand arrow */}
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-100 text-blue-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Book Title</th>
              <th className="px-4 py-3">Borrower Name</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((book, index) => (
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
                      const dateTime = formatLocalDateTime(book.returnDate);
                      return (
                        <div className="flex flex-col items-start">
                          <span>{dateTime.date}</span>
                          <span>{dateTime.time}</span>
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3 text-start font-bold">
                  <span className="text-lg">₱</span> 200.00
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium bg-green-200 text-green-600`}
                    >
                      {book.penalty}
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
                  No activity found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <>
        </>
      </div>
    </div>
  );
}
