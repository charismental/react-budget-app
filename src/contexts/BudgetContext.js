import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext()

export function useBudgets() {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter(expense => expense.id === budgetId);
    };
    const addExpense = ({ description, amount, budgetId }) => {
        setBudgets(prevExpenses => {
            const newExpense = {
                id: uuidV4(),
                description,
                amount,
                budgetId,
            }
            return [...prevExpenses, newExpense];
        })
    };
    const addBudget = ({ name, max }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.some(budget => budget.name === name)) return prevBudgets;
            const newBudget = {
                id: uuidV4(),
                name,
                max,
            }
            return [...prevBudgets, newBudget];
        })
    };
    const deleteBudget = ({ id }) => {
        setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
    };
    const deleteExpense = ({ id }) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    };

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}