export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare function createUser(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
export declare function getUsers(): Promise<User[]>;
export declare function getUserById(id: number): Promise<User | null>;
export declare function updateUser(id: number, updates: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>): Promise<User | null>;
export declare function deleteUser(id: number): Promise<boolean>;
//# sourceMappingURL=user.d.ts.map