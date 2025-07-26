import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getBook } from '@/lib/api';
import { Book } from '@/types';
import BookDetail from '@/components/books/BookDetail';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { toast } from "sonner";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getBook(id);
        if (!data) {
          setError('Book not found');
          return;
        }
        setBook(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book details. Please try again later.');
        toast.error('Failed to load book details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (error === 'Book not found') {
    return <Navigate to="/books" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        ) : book ? (
          <BookDetail book={book} />
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
}