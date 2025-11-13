"use client";
import { useState, useEffect } from "react";
import ExpenseChart from "./components/expenseChart";

export default function Home() {
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalSaved, setTotalSaved] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

  useEffect(() => {
    const loadDashboardData = () => {
      // Load all saved data
      const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      const savedSavings = JSON.parse(localStorage.getItem("savings")) || [];
      const savedBudgets = JSON.parse(localStorage.getItem("budget")) || [];

      // Calculate today's expenses
      const today = new Date().toISOString().split("T")[0];
      const todayExpenses = savedExpenses.filter((exp) => exp.date === today);
      const spent = todayExpenses.reduce(
        (sum, exp) => sum + Number(exp.amount),
        0
      );

      // Calculate total saved
      const saved = savedSavings.reduce(
        (sum, s) => sum + Number(s.saved || 0),
        0
      );

      // Calculate total daily budget (sum of all budgets)
      const totalBudget = savedBudgets.reduce(
        (sum, b) => sum + Number(b.amount || 0),
        0
      );

      // Remaining budget
      const remaining = totalBudget - spent;

      // Update state
      setTotalSpent(spent);
      setTotalSaved(saved);
      setRemainingBudget(remaining);
    };

    // Run on load and when user refocuses the page
    loadDashboardData();
    window.addEventListener("focus", loadDashboardData);
    return () => window.removeEventListener("focus", loadDashboardData);
  }, []);

  return (
    <main className="min-h-screen p-5 text-gray-800  transition-all">
      {/* Dashboard Header */}
      <h1 className="text-3xl mb-4 text-center font-[Dancing_Script] font-medium">
        Dashboard Overview
      </h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
          <p className="text-sm font-medium text-gray-500">Total Spent</p>
          <h2 className="text-2xl font-bold text-red-500 mt-1">
            ₵{totalSpent}
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
          <p className="text-sm font-medium text-gray-500">Total Saved</p>
          <h2 className="text-2xl font-bold text-green-500 mt-1">
            ₵{totalSaved}
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center">
          <p className="text-sm font-medium text-gray-500">Remaining Budget</p>
          <h2 className="text-2xl font-bold text-blue-500 mt-1">
            ₵{remainingBudget}
          </h2>
        </div>
      </div>

      {/* Expense Chart */}
      <div className="h-[40vh] mb-45">
        <ExpenseChart />
      </div>

      {/* Motivational Quote */}
      <div className="bg-linear-to-r from-pink-300 to-pink-500 text-white rounded-xl shadow-lg p-5 border-4 border-pink-100 text-center">
        <p className="text-lg font-medium italic">
          You’re doing amazing, Rose. Keep saving and shining.
        </p>
      </div>
    </main>
  );
}
