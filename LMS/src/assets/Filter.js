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
