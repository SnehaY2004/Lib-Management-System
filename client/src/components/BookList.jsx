export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length) {
    return (
      <p className="empty-state">
        No books found. Add a book or try a different search.
      </p>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Publisher</th>
            <th>Year</th>
            <th>Copies</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.genre}</td>
              <td>{book.publisher}</td>
              <td>{book.publicationYear ?? '—'}</td>
              <td>
                {book.availableCopies} / {book.totalCopies}
              </td>
              <td>{book.bookType}</td>
              <td>
                <span
                  className={`badge ${
                    book.status === 'Available' ? 'badge-available' : 'badge-checked-out'
                  }`}
                >
                  {book.status}
                </span>
              </td>
              <td className="actions-cell">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onEdit(book)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(book._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
