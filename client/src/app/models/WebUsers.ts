export interface WebUsers {
  id: number;
  firstName: string;
  lastName: string;
  accountDate: string;
  email: string;
  password: string;
  banned: boolean;
  token: string;
  rentalBooks?: { bookId: number; rentDate: string }[];
}
