export interface Expense {
    id: number;
    name: string;
    amount: number;
    date: string;
    budgetId: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare function createExpense(expense: Omit<Expense, "id" | "createdAt" | "updatedAt">): Promise<Expense>;
export declare function getExpenses(): Promise<Expense[]>;
export declare function getExpenseById(id: number): Promise<Expense | null>;
export declare function updateExpense(id: number, updates: Partial<Omit<Expense, "id" | "createdAt" | "updatedAt">>): Promise<Expense | null>;
export declare function deleteExpense(id: number): Promise<boolean>;
//# sourceMappingURL=expense.d.ts.map