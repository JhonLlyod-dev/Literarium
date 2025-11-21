import dayjs from "dayjs";

export function filterBooks(books, search, isAvailable) {
  let filtered = [...books];
  const lowerSearch = search?.toLowerCase().trim() || "";

  // ✅ Filter by search text
  if (lowerSearch !== "") {
    filtered = filtered.filter((book) =>
      `${book.title} ${book.author} ${book.year} ${book.pages} ${book.description} ${book.genre} ${book.isAvailable} ${book.borrowedTimes} ${book.isbn}`
        .toLowerCase()
        .includes(lowerSearch)
    );
  }

  // ✅ Filter by availability (if not "All")
  if (isAvailable && isAvailable !== "All") {
    filtered = filtered.filter((b) => b.isAvailable === isAvailable);
  }

  return filtered;
}


export function filterLog(Log, search, Date) {
  let filtered = [...Log];
  const lowerSearch = search?.toLowerCase().trim() || "";

  // ✅ Filter by search text
  if (lowerSearch !== "") {
    filtered = filtered.filter((book) =>
      `${book.title} ${book.author} ${book.transactionId} ${book.status} ${book.borrowerName}`
        .toLowerCase()
        .includes(lowerSearch)
    );
  }

  // ✅ Filter by availability (if not "All")
  if (Date) {
    filtered = filtered.filter((b) => {
      const borrowDay = dayjs(b.borrowDate).format("YYYY-MM-DD");
      const dueDay = dayjs(b.dueDate).format("YYYY-MM-DD");
      const filterDay = dayjs(Date).format("YYYY-MM-DD");
      return borrowDay === filterDay || dueDay === filterDay;
    });
  }


  return filtered;
}


export function filterBorrow(Log, search, Date, status) {
  let filtered = [...Log];
  const lowerSearch = search?.toLowerCase().trim() || "";

  // ✅ Filter by search text
  if (lowerSearch !== "") {
    filtered = filtered.filter((book) =>
      `${book.title} ${book.author} ${book.transactionId} ${book.status} ${book.borrowerName}`
        .toLowerCase()
        .includes(lowerSearch)
    );
  }
  if (Date) {
    filtered = filtered.filter((b) => {
      const borrowDay = dayjs(b.borrowDate).format("YYYY-MM-DD");
      const dueDay = dayjs(b.dueDate).format("YYYY-MM-DD");
      const filterDay = dayjs(Date).format("YYYY-MM-DD");
      return borrowDay === filterDay || dueDay === filterDay;
    });
  }

  if (status && status !== "All") {
    filtered = filtered.filter((b) => b.status === status);
  }

  return filtered;
}


export const statusStyles = {
  Borrowed: "bg-green-200 text-green-700",
  Cancelled: "bg-gray-200 text-gray-700",
  Overdue: "bg-red-200 text-red-700",
  Waiting: "bg-orange-200 text-orange-700",
  "Reserved – Pick Up": "bg-yellow-200 text-yellow-700",
  Returned: "bg-blue-200 text-blue-700"
};
