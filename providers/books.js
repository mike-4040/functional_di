const books = [];

export const queryBooks = () => books;

export const saveBook = book => books.push(book);

export const queryBookById = id => books.find(book => book.id === id);
