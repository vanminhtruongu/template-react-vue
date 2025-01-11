import createBaseService from './base.service'

const createBookService = () => {
    const baseService = createBaseService('/books')

    // Get all books with pagination
    const getBooks = async (page = 1, limit = 10) => {
        return baseService.get('', { page, limit })
    }

    // Get book by ID
    const getBookById = async (id) => {
        return baseService.get(`/${id}`)
    }

    // Create new book
    const createBook = async (bookData) => {
        return baseService.post('', bookData)
    }

    // Update book
    const updateBook = async (id, bookData) => {
        return baseService.put(`/${id}`, bookData)
    }

    // Delete book
    const deleteBook = async (id) => {
        return baseService.delete(`/${id}`)
    }

    // Search books
    const searchBooks = async (query) => {
        return baseService.get('/search', { query })
    }

    return {
        getBooks,
        getBookById,
        createBook,
        updateBook,
        deleteBook,
        searchBooks
    }
}

// Create a singleton instance
const bookService = createBookService()
export default bookService 