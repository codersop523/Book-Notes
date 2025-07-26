import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme/mode-toggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">Book Notes Library</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link to="/">
              <Button variant="ghost" className="text-sm">
                Home
              </Button>
            </Link>
            <Link to="/books">
              <Button variant="ghost" className="text-sm">
                Books
              </Button>
            </Link>
            <Link to="/books/new">
              <Button variant="ghost" className="text-sm">
                Add Book
              </Button>
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}