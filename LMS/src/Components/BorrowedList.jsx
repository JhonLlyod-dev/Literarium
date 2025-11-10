import { useState } from "react";
import { books } from "../assets/Data";
import { Search,Album } from "lucide-react";
import dayjs from "dayjs";

export default function BorrowedList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Filter books that are currently borrowed
  const borrowedBooks = books.filter((book) => book.status === "Borrowed");

  // Apply filters (search + date)
  const filteredBooks = borrowedBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.borrowerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = filterDate
      ? dayjs(book.borrowedDate).isSame(filterDate, "day")
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="mt-4 flex-center gap-4 w-full p-4 px-8">
      <div className="w-full rounded-lg shadow border border-gray-200 overflow-hidden">
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
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
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
                        {book.genre}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{book.borrowerName}</td>
                  <td className="px-4 py-3">{book.transactionID}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {book.borrowedDate || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {book.dueDate || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
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
  );
}
