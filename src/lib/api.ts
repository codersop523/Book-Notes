import axios from 'axios';
import { BookFormData, Book } from '@/types';

const API_URL = 'http://localhost:5000/api';

// Function to fetch book cover from Open Library API
export const fetchBookCover = async (isbn: string, size: 'S' | 'M' | 'L' = 'M') => {
  try {
    const response = await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`, { 
      responseType: 'arraybuffer' 
    });
    
    // Check if we got a real cover (not the default "no cover" image)
    if (response.headers['content-length'] && parseInt(response.headers['content-length']) > 1000) {
      return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
    }
    return null;
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return null;
  }
};

// Book CRUD operations
export const getBooks = async (): Promise<Book[]> => {
  // In a real application with a backend, you would fetch from API:
  // const response = await axios.get(`${API_URL}/books`);
  // return response.data;
  
  // For now, we'll retrieve from localStorage
  const books = localStorage.getItem('books');
  return books ? JSON.parse(books) : [];
};

export const getBook = async (id: string): Promise<Book | null> => {
  // In a real application with a backend:
  // const response = await axios.get(`${API_URL}/books/${id}`);
  // return response.data;
  
  // For now, using localStorage
  const books = await getBooks();
  return books.find((book) => book.id === id) || null;
};

export const createBook = async (bookData: BookFormData): Promise<Book> => {
  // In a real application with a backend:
  // const response = await axios.post(`${API_URL}/books`, bookData);
  // return response.data;
  
  // For now, using localStorage
  const books = await getBooks();
  const newBook: Book = {
    ...bookData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coverUrl: bookData.isbn ? await fetchBookCover(bookData.isbn) : undefined
  };
  
  localStorage.setItem('books', JSON.stringify([...books, newBook]));
  return newBook;
};

export const updateBook = async (id: string, bookData: BookFormData): Promise<Book> => {
  // In a real application with a backend:
  // const response = await axios.put(`${API_URL}/books/${id}`, bookData);
  // return response.data;
  
  // For now, using localStorage
  const books = await getBooks();
  const bookIndex = books.findIndex((book) => book.id === id);
  
  if (bookIndex === -1) {
    throw new Error('Book not found');
  }
  
  const updatedBook: Book = {
    ...books[bookIndex],
    ...bookData,
    updatedAt: new Date().toISOString(),
    coverUrl: bookData.isbn ? await fetchBookCover(bookData.isbn) : books[bookIndex].coverUrl
  };
  
  books[bookIndex] = updatedBook;
  localStorage.setItem('books', JSON.stringify(books));
  
  return updatedBook;
};

export const deleteBook = async (id: string): Promise<void> => {
  // In a real application with a backend:
  // await axios.delete(`${API_URL}/books/${id}`);
  
  // For now, using localStorage
  const books = await getBooks();
  const filteredBooks = books.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(filteredBooks));
};

// Search books functionality
export const searchBooks = async (query: string): Promise<Book[]> => {
  const books = await getBooks();
  
  if (!query) return books;
  
  const lowerQuery = query.toLowerCase();
  return books.filter((book) => 
    book.title.toLowerCase().includes(lowerQuery) || 
    book.author.toLowerCase().includes(lowerQuery)
  );
};