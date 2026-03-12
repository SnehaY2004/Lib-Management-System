const API_BASE = "https://library-management-system-2od3.onrender.com";

async function request(path, options = {}) {
  const url = `${API_BASE.replace(/\/$/, '')}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || res.statusText || 'Request failed');
  }
  return data;
}

export async function getBooks() {
  return request('/books');
}

export async function getBookById(id) {
  return request(`/books/${id}`);
}

export async function createBook(book) {
  return request('/books', {
    method: 'POST',
    body: JSON.stringify(book),
  });
}

export async function updateBook(id, book) {
  return request(`/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(book),
  });
}

export async function deleteBook(id) {
  return request(`/books/${id}`, { method: 'DELETE' });
}

export async function searchBooks({ title, author }) {
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  if (author) params.set('author', author);
  return request(`/books/search?${params.toString()}`);
}
