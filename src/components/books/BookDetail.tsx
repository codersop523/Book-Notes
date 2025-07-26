import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, Pencil } from 'lucide-react';

interface BookDetailProps {
  book: Book;
}

export default function BookDetail({ book }: BookDetailProps) {
  // Format the date in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const placeholderCover = 'https://via.placeholder.com/160x200?text=No+Cover';

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/books">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to books
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-[200px] bg-muted rounded-md overflow-hidden flex items-center justify-center p-2">
            <img
              src={book.coverUrl || placeholderCover}
              alt={`Cover of ${book.title}`}
              className="w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = placeholderCover;
              }}
            />
          </div>
          
          <div className="flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-5 w-5 ${i < book.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>

          <Link to={`/books/edit/${book.id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full gap-1">
              <Pencil className="h-4 w-4" />
              Edit Book
            </Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-xl text-muted-foreground">by {book.author}</p>
            <p className="text-sm text-muted-foreground mt-1">Read on: {formatDate(book.dateRead)}</p>
            
            {book.isbn && (
              <p className="text-sm text-muted-foreground">ISBN: {book.isbn}</p>
            )}
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">My Notes</h2>
            <div className="prose max-w-none dark:prose-invert">
              {book.notes.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}