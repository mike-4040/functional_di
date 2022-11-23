import { v4 } from 'uuid';
import { getBooks, queryBookById, createBook } from '../providers/books.js';

export const getAllBooks = async (_req, res) => {
  const books = getBooks();
  res.json(books);
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: 'Missing book id' });
  }
  const book = queryBookById(id);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
  }

  res.json(book);
};

export const postBook = async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).json({ message: 'Missing book title or author' });
  }

  const id = v4();
  createBook({ id, title, author });
  res.json({ id });
};
