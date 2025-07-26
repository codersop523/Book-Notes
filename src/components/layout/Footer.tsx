export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with ❤️ using React, Shadcn UI, and Tailwind CSS 
        </p>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-right">
         &copy; 2025 Taher_Limdiwala, Inc 
         {/* <a href="https://sive.rs/book" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Derek Sivers&apos; book notes</a> */}
        </p>
      </div>
    </footer>
  );
}