import { useState } from 'react';
import { BookFormData } from '@/types';
import { createBook } from '@/lib/api';
import BookForm from '@/components/books/BookForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AddBookPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: BookFormData) => {
    setIsSubmitting(true);
    try {
      await createBook(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <BookForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          title="Add a New Book"
          submitButtonText="Add Book"
        />
      </main>
      
      <Footer />
    </div>
  );
}