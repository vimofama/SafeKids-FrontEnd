import type { Guardian } from "../admin/student.response";

export interface AuthorizedPersons {
    id:       string;
    fullName: string;
    ci:       string;
    phone:    string;
    imageURL: string;
    guardian: Guardian;
}

