import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Star } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { deleteBook } from '@/lib/api';

interface BookCardProps {
  book: Book;
  onDelete: () => void;
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const placeholderCover = 'https://via.placeholder.com/160x200?text=No+Cover';
  
  // Format the date in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBook(book.id);
      onDelete();
    } catch (error) {
      console.error('Error deleting book:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-40 flex-shrink-0 flex items-center justify-center bg-muted p-2">
          <img 
            src={book.coverUrl || placeholderCover} 
            alt={`Cover of ${book.title}`}
            className="h-40 object-contain rounded-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = placeholderCover;
            }}
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{book.title}</CardTitle>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < book.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
            <p className="text-xs text-muted-foreground mt-1">Read on: {formatDate(book.dateRead)}</p>
          </CardHeader>
          
          <CardContent className="p-4 pt-2 flex-grow">
            <div className="line-clamp-4 text-sm">
              {book.notes}
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Link to={`/books/${book.id}`}>
              <Button variant="outline" size="sm">Read Notes</Button>
            </Link>
            
            <div className="flex gap-2">
              <Link to={`/books/edit/${book.id}`}>
                <Button variant="outline" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete "{book.title}" and all of its notes. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}