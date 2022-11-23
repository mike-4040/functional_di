import { v4 as uuid } from 'uuid';

import { saveBook } from '../providers/books.js';

export const createBook = data => {
  if (!data) {
    return { errMessage: 'Missing book data' };
  }

  const { title, author } = data;

  if (!title) {
    return { errMessage: 'Missing book title' };
  }

  if (!author) {
    return { errMessage: 'Missing book author' };
  }

  const id = uuid();
  const book = { id, title, author };

  try {
    saveBook(book);
    return { id };
  } catch (err) {
    console.error(err);
    return { errMessage: 'Internal server error' };
  }
};
