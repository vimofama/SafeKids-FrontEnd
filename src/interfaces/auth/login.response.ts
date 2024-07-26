export interface LoginFailResponse {
    message:    string;
    error:      string;
    statusCode: number;
}

export interface LoginExitResponse {
    id:       string;
    email:    string;
    password: string;
    fullName: string;
    ci:       string;
    phone:    string;
    userRole: string;
    imageURL: string;
    jwt:      string;
}
