import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Welcome to Book Notes Library
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Track, Remember, and Share Your Reading Journey
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Never forget what you've read. Take notes, rate books, and build your personal reading library.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/books" className="gap-2">
                    <BookOpen className="h-5 w-5" />
                    Browse Library
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/books/new" className="gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Add New Book
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 p-4 rounded-full">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Track Your Books</h3>
              <p className="text-muted-foreground">
                Keep a digital record of all the books you've read, complete with your personal ratings.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                  <path d="M14 4h4v4h-4z"></path>
                  <path d="M4 14h4v4H4z"></path>
                  <path d="M17 7 7 17"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Take Detailed Notes</h3>
              <p className="text-muted-foreground">
                Capture your thoughts, insights, and favorite quotes while they're fresh in your mind.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="bg-primary/10 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Rate and Sort</h3>
              <p className="text-muted-foreground">
                Assign ratings to books and easily sort your collection by title, date read, or rating.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted">
          <div className="container px-4 md:px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Inspired by Derek Sivers' Book Notes
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              This project is inspired by <a href="https://sive.rs/book" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Derek Sivers' book notes</a>, where he keeps a public record of books he's read along with his notes and ratings.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/books">Start Building Your Library</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}