const books = [];

export const getBooks = () => books;

export const createBook = (book) => books.push(book);

export const queryBookById = (id) => books.find((book) => book.id === id);
