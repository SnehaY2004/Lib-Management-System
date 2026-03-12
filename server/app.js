const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Library Management API',
    endpoints: {
      'POST /books': 'Add a new book',
      'GET /books': 'Get all books',
      'GET /books/:id': 'Get book by ID',
      'PUT /books/:id': 'Update book',
      'DELETE /books/:id': 'Delete book',
      'GET /books/search?title=xyz&author=abc': 'Search books by title or author',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
