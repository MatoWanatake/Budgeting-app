export interface Budget {
    id: number;
    name: string;
    totalAmount: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare function createBudget(budget: Omit<Budget, "id" | "createdAt" | "updatedAt">): Promise<Budget>;
export declare function getBudgets(): Promise<Budget[]>;
export declare function getBudgetById(id: number): Promise<Budget | null>;
export declare function updateBudget(id: number, updates: Partial<Omit<Budget, "id" | "createdAt" | "updatedAt">>): Promise<Budget | null>;
//# sourceMappingURL=budget.d.ts.map