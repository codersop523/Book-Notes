import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { BookFormData, Book } from '@/types';
import { fetchBookCover } from '@/lib/api';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: BookFormData) => Promise<void>;
  isSubmitting: boolean;
  title: string;
  submitButtonText: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().optional(),
  rating: z.coerce.number().min(1).max(5),
  notes: z.string().min(1, "Notes are required"),
  dateRead: z.string(),
});

export default function BookForm({ initialData, onSubmit, isSubmitting, title, submitButtonText }: BookFormProps) {
  const navigate = useNavigate();
  const [coverPreview, setCoverPreview] = useState<string | null>(initialData?.coverUrl || null);
  const [isLoadingCover, setIsLoadingCover] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      author: initialData?.author || "",
      isbn: initialData?.isbn || "",
      rating: initialData?.rating || 3,
      notes: initialData?.notes || "",
      dateRead: initialData?.dateRead || new Date().toISOString().split('T')[0],
    },
  });
  
  const isbn = form.watch("isbn");

  useEffect(() => {
    // Load cover preview when ISBN changes and is valid
    const loadCoverPreview = async () => {
      if (isbn && isbn.length >= 10) {
        setIsLoadingCover(true);
        try {
          const coverUrl = await fetchBookCover(isbn);
          setCoverPreview(coverUrl);
        } catch (error) {
          console.error('Error fetching cover preview:', error);
        } finally {
          setIsLoadingCover(false);
        }
      } else {
        setCoverPreview(null);
      }
    };

    loadCoverPreview();
  }, [isbn]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values as BookFormData);
      toast.success(initialData ? "Book updated successfully" : "Book added successfully");
      navigate('/books');
    } catch (error) {
      console.error('Error submitting book:', error);
      toast.error("Failed to save book. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">Fill in the details about the book you've read.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter book title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ISBN to fetch cover" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter ISBN-10 or ISBN-13 to fetch the book cover
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">★☆☆☆☆ - 1/5</SelectItem>
                        <SelectItem value="2">★★☆☆☆ - 2/5</SelectItem>
                        <SelectItem value="3">★★★☆☆ - 3/5</SelectItem>
                        <SelectItem value="4">★★★★☆ - 4/5</SelectItem>
                        <SelectItem value="5">★★★★★ - 5/5</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateRead"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Read</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your thoughts about the book"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Cover Preview</h3>
                <div className="border rounded-md p-4 flex items-center justify-center bg-muted h-[200px]">
                  {isLoadingCover ? (
                    <div className="text-sm text-muted-foreground">Loading cover...</div>
                  ) : coverPreview ? (
                    <img 
                      src={coverPreview} 
                      alt="Book cover preview" 
                      className="max-h-full object-contain"
                      onError={() => setCoverPreview(null)} 
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No cover available.
                      {isbn ? " Try a different ISBN." : " Enter an ISBN to fetch the cover."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/books')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}