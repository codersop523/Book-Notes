import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { getBooks } from '@/lib/api';
import BookList from '@/components/books/BookList';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from "sonner";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load books. Please try again later.');
      toast.error('Failed to load books');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Book Library</h1>
            <p className="text-muted-foreground">
              {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
            </p>
          </div>
          
          <Link to="/books/new">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Book
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
            <Button variant="outline" onClick={fetchBooks} className="mt-4">
              Retry
            </Button>
          </div>
        ) : (
          <BookList books={books} onDeleteBook={fetchBooks} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}