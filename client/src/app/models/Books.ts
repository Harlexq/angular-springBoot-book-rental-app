export interface Books {
  id: number;
  title: string;
  description: string;
  image: string;
  publisher: string;
  author: string;
  categoryId: number;
  price: number;
  publishDate: string;
  pageNumber: number;
  isRented: boolean;
  rentedFrom: number;
}
