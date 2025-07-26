import { useState } from 'react';
import { Book, SortOption } from '@/types';
import BookCard from './BookCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SortAsc } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onDeleteBook: () => void;
}

export default function BookList({ books, onDeleteBook }: BookListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('dateRead');

  // Filter books based on search query
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort books based on selected criteria
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'dateRead':
        return new Date(b.dateRead).getTime() - new Date(a.dateRead).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title or author"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="dateRead">Sort by Date Read</SelectItem>
              <SelectItem value="title">Sort by Title</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {sortedBooks.map(book => (
            <BookCard key={book.id} book={book} onDelete={onDeleteBook} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No books found</h3>
          <p className="text-muted-foreground mt-1">
            {books.length > 0
              ? "No books match your search query."
              : "You haven't added any books yet. Add your first book to get started!"}
          </p>
          {books.length === 0 && (
            <Button className="mt-4" asChild>
              <a href="/books/new">Add your first book</a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}