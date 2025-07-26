import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container flex flex-col items-center justify-center py-16 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </main>
      
      <Footer />
    </div>
  );
}