import BudgetCard from "./BudgetCard";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetContext';


export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0);
    if (amount === 0) return null;
    return (
        <BudgetCard gray amount={amount} name="Uncategorized" {...props} />
    )
}