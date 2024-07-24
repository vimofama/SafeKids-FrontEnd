export interface Student {
  id: string;
  fullName: string;
  ci: string;
  guardian: UsersResponse;
  authorizedPersons: AuthorizedPerson[];
}

export interface UsersResponse {
  id: string;
  email: string;
  password: string;
  fullName: string;
  ci: string;
  phone: string;
  userRole: UserRole;
  students?: Student[];
}

export interface AuthorizedPerson {
  id: string;
  fullName: string;
  ci: string;
  phone: string;
}

export enum UserRole {
  Administrador = "Administrador",
  PersonalDeSeguridad = "Personal de seguridad",
  Tutor = "Tutor",
}
