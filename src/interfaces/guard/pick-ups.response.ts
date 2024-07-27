import type { Guardian } from "../admin/student.response";
import type { StudenResponse } from "../admin/student.response";

export interface PickUpResponse {
  id: string;
  timestamp: Date;
  isPickedUp: boolean;
  authorizedPerson: AuthorizedPerson;
  student: StudenResponse;
}

export interface AuthorizedPerson {
  id: string;
  fullName: string;
  ci: string;
  phone?: string;
  imageURL: string;
  guardian: Guardian;
}
