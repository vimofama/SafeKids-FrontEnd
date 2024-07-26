export interface StudenResponse {
  id: string;
  fullName: string;
  ci: string;
  imageURL: string;
  guardian: Guardian;
}

export interface Guardian {
  id: string;
  email: string;
  password: string;
  fullName: string;
  ci: string;
  phone: string;
  userRole: string;
  imageURL: string;
}
