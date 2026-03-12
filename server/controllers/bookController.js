const Book = require('../models/Book');

const addBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists',
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. '),
      });
    }
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists',
      });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. '),
      });
    }
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Book not found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: {},
      message: 'Book deleted successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format',
      });
    }
    next(error);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const { title, author } = req.query;
    if (!title && !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one search parameter: title or author',
      });
    }
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }
    const books = await Book.find(filter).sort({ title: 1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
};
