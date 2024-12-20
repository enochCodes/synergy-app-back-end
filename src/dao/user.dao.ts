export interface CreateUserDAO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    userName: string;
    role: "BUSINESS" | "CREATOR";
}

export interface UpdateUserDAO {
    userName?: string;
    email?: string;
    password?: string;
    role?: "BUSINESS" | "CREATOR";
    firstName?: string;
    lastName?: string;
}