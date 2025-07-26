export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  rating: number;
  notes: string;
  dateRead: string;
  coverUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type SortOption = 'rating' | 'dateRead' | 'title';

export interface BookFormData {
  title: string;
  author: string;
  isbn?: string;
  rating: number;
  notes: string;
  dateRead: string;
}