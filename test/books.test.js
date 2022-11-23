import { expect } from 'chai';
import mockery from 'mockery';
import sinon from 'sinon';

import * as booksProvider from '../providers/books.js';

describe('domain/books', () => {
  let createBook;
  let saveBookStub;
  let uuidStub;
  let consoleErrorStub;

  before(async () => {
    saveBookStub = sinon.stub(booksProvider, 'saveBook');
    consoleErrorStub = sinon.stub(console, 'error');

    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
    });
    uuidStub = sinon.stub();
    mockery.registerMock('uuid', { v4: uuidStub });

    ({ createBook } = await import('../domain/books.js'));
  });

  afterEach(() => {
    sinon.resetHistory();
    saveBookStub.resetBehavior();
  });

  after(() => {
    sinon.restore();
    mockery.disable();
    mockery.deregisterAll();
  });

  describe('createBook', () => {
    it('should return an error message if no data is provided', () => {
      const { errMessage } = createBook();
      expect(errMessage).to.equal('Missing book data');
    });

    it('should return an error message if no title is provided', () => {
      const { errMessage } = createBook({ author: 'Jane Doe' });
      expect(errMessage).to.equal('Missing book title');
    });

    it('should return an error message if no author is provided', () => {
      const { errMessage } = createBook({ title: 'My Book' });
      expect(errMessage).to.equal('Missing book author');
    });

    it('try to save a book and return an error message if it fails', () => {
      const message = 'Database is down';
      saveBookStub.throws(new Error(message));

      const { errMessage } = createBook({
        title: 'My Book',
        author: 'Jane Doe',
      });
      expect(consoleErrorStub.firstCall.firstArg.message).to.equal(message);
      expect(errMessage).to.equal('Internal server error');
    });

    it('should save a book and return the id', () => {
      const id = 'abc123';
      uuidStub.returns(id);

      const { id: bookId } = createBook({
        title: 'My Book',
        author: 'Jane Doe',
      });
      expect(bookId).to.equal(id);
    });
  });
});
