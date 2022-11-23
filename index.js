import express, { urlencoded } from 'express';

import { DEFAULT_PORT } from './constants.js';
import { helloWorld } from './controllers/helloWorld.js';
import { serverReady } from './controllers/serverReady.js';
import { getAllBooks, getBook, postBook } from './controllers/books.js';

const port = process.env.PORT || DEFAULT_PORT;

express()
  .use(urlencoded({ extended: true }))
  .get('/', helloWorld)
  .get('/books', getAllBooks)
  .get('/books/:id', getBook)
  .post('/books', postBook)
  .listen(port, serverReady);
