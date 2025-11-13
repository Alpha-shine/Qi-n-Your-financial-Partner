"use client";
import { useState, useEffect, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function DailyBudgetsPage() {
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [budget, setBudget] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("budget")) || [];
    } catch {
      return [];
    }
  });

  // Save budgets to localStorage
  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  // Calculate today's total expenses
  const totalExpenses = useMemo(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const today = new Date().toISOString().split("T")[0];
    const todayExpenses = savedExpenses.filter((exp) => exp.date === today);
    return todayExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  }, []);

  // Check if any budget exceeded
  useEffect(() => {
    budget.forEach((b) => {
      const budgetAmount = Number(b.amount);
      if (budgetAmount > 0 && totalExpenses > budgetAmount) {
        console.log(`You’ve exceeded your daily budget for "${b.budgetName}"!`);
      }
    });
  }, [budget, totalExpenses]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      const updatedBudgets = budget.map((b) =>
        b.id === editingId ? { ...b, budgetName, amount, category } : b
      );
      setBudget(updatedBudgets);
      setEditingId(null);
    } else {
      const newBudget = {
        id: Date.now(),
        budgetName,
        amount,
        category,
      };
      setBudget([...budget, newBudget]);
    }

    setBudgetName("");
    setAmount("");
    setCategory("");
  };

  // Edit budget
  const handleEdit = (id) => {
    const selected = budget.find((b) => b.id === id);
    setBudgetName(selected.budgetName);
    setAmount(selected.amount);
    setCategory(selected.category);
    setEditingId(id);
  };

  // Delete budget
  const handleDelete = (id) => {
    const filtered = budget.filter((b) => b.id !== id);
    setBudget(filtered);
  };

  // Summary data
  const totalBudget = budget.reduce((sum, b) => sum + Number(b.amount), 0);
  const remaining = Math.max(totalBudget - totalExpenses, 0);

  // Motivational quotes
  const quotes = [
    "You’re doing amazing, keep it up.",
    "Small steps lead to big savings.",
    "Budgeting is self care.",
    "Stay consistent, your goals are close.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <main className="flex flex-col items-center px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center font-[Dancing_Script]">
        {editingId ? "Edit Your Budget" : "Set Your Daily Budget"}
      </h1>

      {/* Quick Summary */}
      <div className="w-full md:w-[70vw] bg-white rounded-2xl shadow-md p-6 mb-10 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-pink-500 font-semibold">
          <div className="bg-pink-100 rounded-lg p-4">
            <p className="text-lg">Total Budget</p>
            <p className="text-2xl font-bold">GHS {totalBudget.toFixed(2)}</p>
          </div>
          <div className="bg-pink-100 rounded-lg p-4">
            <p className="text-lg">Total Spent</p>
            <p className="text-2xl font-bold">GHS {totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-pink-100 rounded-lg p-4">
            <p className="text-lg">Remaining</p>
            <p className="text-2xl font-bold text-green-500">
              GHS {remaining.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="mt-6 text-pink-400 italic font-medium">{randomQuote}</p>
      </div>

      {/* Budget Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[70vw] bg-white p-6 rounded-2xl shadow-md mb-10"
      >
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            className="border-4 w-full h-10 rounded-lg bg-gray-50 text-pink-300 px-2 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
            placeholder="Budget Name"
            required
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-4 w-full h-10 rounded-lg bg-gray-50 text-pink-300 px-2 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
            placeholder="Target Amount (GHS)"
            required
            min={0}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-4 w-full h-10 rounded-lg bg-gray-50 text-pink-400 px-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
            required
          >
            <option value="">Select Category</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Home">Home</option>
            <option value="Transportation">Transportation</option>
            <option value="Education">Education</option>
            <option value="Relationships">Relationships</option>
            <option value="Work">Work</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>

          <button
            type="submit"
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 rounded-lg transition-all"
          >
            {editingId ? "Save Changes" : "Add Budget"}
          </button>
        </div>
      </form>

      {/* Budget List */}
      <div className="w-full md:w-[70vw] bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-pink-400 mb-4 text-center">
          Your Daily Budgets
        </h2>

        {budget.length === 0 ? (
          <p className="text-pink-300 text-center">No budget added yet</p>
        ) : (
          <ul className="space-y-4">
            {budget.map((b) => {
              const budgetAmount = Number(b.amount);
              const isOverBudget = totalExpenses > budgetAmount;
              const difference = totalExpenses - budgetAmount;

              return (
                <li
                  key={b.id}
                  className="bg-gray-50 border border-pink-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-pink-400"
                >
                  <div>
                    <p className="font-bold text-lg">{b.budgetName}</p>
                    <p>Target: GHS {b.amount}</p>
                    <p>Category: {b.category}</p>
                    <p>Expenses: GHS {totalExpenses}</p>
                    {budgetAmount > 0 && isOverBudget ? (
                      <p className="text-red-500 font-semibold mt-2">
                        Over Budget by GHS {difference.toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-green-500 font-semibold mt-2">
                        Within Budget
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 mt-3 sm:mt-0">
                    <FaEdit
                      onClick={() => handleEdit(b.id)}
                      className="text-blue-400 hover:text-blue-600 cursor-pointer"
                    />
                    <FaTrash
                      onClick={() => handleDelete(b.id)}
                      className="text-pink-400 hover:text-red-600 cursor-pointer"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
