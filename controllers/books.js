import { v4 as uuid } from 'uuid';

import { saveBook } from '../providers/books.js';
import { createBook } from '../domain/books.js';
import { queryBooks, queryBookById } from '../providers/books.js';

export const getAllBooks = async (_req, res) => {
  const books = queryBooks();
  res.json(books);
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: 'Missing book id' });
    return;
  }

  const book = queryBookById(id);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  res.json(book);
};

const createBookDependencies = {
  uuid,
  saveBook,
}

export const postBook = async (req, res) => {
  const { body } = req;

  const { errMessage, id } = createBook(body, createBookDependencies);

  if (errMessage) {
    res.status(400).json({ errMessage });
    return;
  }
  res.json({ id });
};
