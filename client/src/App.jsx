import { useState, useEffect } from 'react';
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
} from './api/books';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';
import './App.css';

const defaultBook = {
  title: '',
  author: '',
  isbn: '',
  genre: '',
  publisher: '',
  publicationYear: '',
  totalCopies: '',
  shelfLocation: '',
  bookType: 'Circulating',
};

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState(defaultBook);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBooks();
      setBooks(res.data || []);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSearch = async () => {
    if (!searchTitle.trim() && !searchAuthor.trim()) {
      loadBooks();
      setSearchMode(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await searchBooks({
        title: searchTitle.trim() || undefined,
        author: searchAuthor.trim() || undefined,
      });
      setBooks(res.data || []);
      setSearchMode(true);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTitle('');
    setSearchAuthor('');
    setSearchMode(false);
    loadBooks();
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(defaultBook);
    setFormOpen(true);
  };

  const openEditForm = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre,
      publisher: book.publisher,
      publicationYear: book.publicationYear ?? '',
      totalCopies: book.totalCopies ?? '',
      shelfLocation: book.shelfLocation ?? '',
      bookType: book.bookType || 'Circulating',
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormData(defaultBook);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      isbn: formData.isbn.trim(),
      genre: formData.genre.trim(),
      publisher: formData.publisher.trim(),
      publicationYear: formData.publicationYear ? Number(formData.publicationYear) : undefined,
      totalCopies: Number(formData.totalCopies) || 1,
      shelfLocation: formData.shelfLocation.trim() || undefined,
      bookType: formData.bookType,
    };
    setError(null);
    try {
      if (editingId) {
        await updateBook(editingId, payload);
        closeForm();
      } else {
        await createBook(payload);
        closeForm();
      }
      loadBooks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return;
    setError(null);
    try {
      await deleteBook(id);
      loadBooks();
      if (formOpen && editingId === id) closeForm();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Library Management System</h1>
        <p className="subtitle">Manage books, view records, and search the catalog</p>
      </header>

      <main className="main">
        <div className="toolbar">
          <SearchBar
            searchTitle={searchTitle}
            searchAuthor={searchAuthor}
            onTitleChange={setSearchTitle}
            onAuthorChange={setSearchAuthor}
            onSearch={handleSearch}
            onClear={clearSearch}
            searchMode={searchMode}
          />
          <button type="button" className="btn btn-primary" onClick={openAddForm}>
            + Add Book
          </button>
        </div>

        {error && (
          <div className="alert alert-error" role="alert">
            {error}
          </div>
        )}

        {formOpen && (
          <section className="card form-card">
            <h2>{editingId ? 'Edit Book' : 'Add New Book'}</h2>
            <BookForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={closeForm}
              isEdit={!!editingId}
            />
          </section>
        )}

        <section className="card list-card">
          <h2>Books</h2>
          {loading ? (
            <p className="loading">Loading…</p>
          ) : (
            <BookList
              books={books}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}
