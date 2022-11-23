import { expect } from 'chai';
import sinon from 'sinon';

describe('domain/books', () => {
  let createBook;
  let saveBookStub;
  let uuidStub;
  let consoleErrorStub;
  let dependencies;

  before(async () => {
    saveBookStub = sinon.stub();
    uuidStub = sinon.stub();
    dependencies = {
      saveBook: saveBookStub,
      uuid: uuidStub,
    };
    consoleErrorStub = sinon.stub(console, 'error');

    ({ createBook } = await import('../domain/books.js'));
  });

  afterEach(() => {
    sinon.resetHistory();
    saveBookStub.resetBehavior();
  });

  after(() => {
    sinon.restore();
  });

  describe('createBook', () => {
    it('should return an error message if no data is provided', () => {
      const { errMessage } = createBook(undefined, dependencies);
      expect(errMessage).to.equal('Missing book data');
    });

    it('should return an error message if no title is provided', () => {
      const { errMessage } = createBook({ author: 'Jane Doe' }, dependencies);
      expect(errMessage).to.equal('Missing book title');
    });

    it('should return an error message if no author is provided', () => {
      const { errMessage } = createBook({ title: 'My Book' },   dependencies);
      expect(errMessage).to.equal('Missing book author');
    });

    it('try to save a book and return an error message if it fails', () => {
      const message = 'Database is down';
      saveBookStub.throws(new Error(message));

      const { errMessage } = createBook({
        title: 'My Book',
        author: 'Jane Doe',
      }, dependencies);
      expect(consoleErrorStub.firstCall.firstArg.message).to.equal(message);
      expect(errMessage).to.equal('Internal server error');
    });

    it('should save a book and return the id', () => {
      const id = 'abc123';
      uuidStub.returns(id);

      const { id: bookId } = createBook({
        title: 'My Book',
        author: 'Jane Doe',
      }, dependencies);
      expect(bookId).to.equal(id);
    });
  });
});
