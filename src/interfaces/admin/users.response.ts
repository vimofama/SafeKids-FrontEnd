export interface Student {
  id: string;
  fullName: string;
  ci: string;
  imageURL: string;
  guardian: UsersResponse;
}

export interface UsersResponse {
  id: string;
  email: string;
  password: string;
  fullName: string;
  ci: string;
  phone: string;
  userRole: string;
  imageURL: string;
  students?: Student[];
}