export interface Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare function createCategory(category: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category>;
export declare function getCategories(): Promise<Category[]>;
export declare function getCategoryById(id: number): Promise<Category | null>;
export declare function updateCategory(id: number, updates: Partial<Omit<Category, "id" | "createdAt" | "updatedAt">>): Promise<Category | null>;
export declare function deleteCategory(id: number): Promise<boolean>;
//# sourceMappingURL=category.d.ts.map