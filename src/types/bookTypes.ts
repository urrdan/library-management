export type Book = {
  id: string;
} & BookProfile;

export type BookProfile = {
  title: string;
  totalCopies: number;
  availableCopies: number;
  genre: string;
  author: string;
  pages: number;
  isbn: string;
  coverImageUrl?: string;
  releasedDate: string;
};

export type BookInputForm = {
  title: string;
  totalCopies: string;
  availableCopies: string;
  genre: string;
  author: string;
  pages: string;
  isbn: string;
  coverImageUrl?: string;
  releasedDate: string;
};
