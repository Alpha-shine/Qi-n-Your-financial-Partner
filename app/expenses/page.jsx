"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaWallet, FaEdit, FaTrash } from "react-icons/fa";

export default function ExpensesPage() {
  const [isClient, setIsClient] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      setExpenses(savedExpenses);
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses, isClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedExpenses = expenses.map((exp) =>
        exp.id === editingId ? { ...exp, title, amount, category, date } : exp
      );
      setExpenses(updatedExpenses);
      setEditingId(null);
    } else {
      const newExpense = { id: Date.now(), title, amount, category, date };
      setExpenses([...expenses, newExpense]);
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleEdit = (id) => {
    const exp = expenses.find((item) => item.id === id);
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDate(exp.date);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const filtered = expenses.filter((exp) => exp.id !== id);
    setExpenses(filtered);
  };

  if (!isClient) return null;

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-center mt-5 px-3">
        <ul className="flex flex-wrap justify-center gap-4">
          <Link href="">
            <li className="flex space-x-2 sm:space-x-3 items-center px-3 py-2 bg-white text-pink-400 border-2 border-pink-100 rounded-lg shadow-sm hover:bg-pink-50 transition-all">
              <FaPlus className="text-pink-400" />
              <h1 className="text-sm sm:text-base font-medium">Add Expenses</h1>
            </li>
          </Link>
          <Link href="">
            <li className="flex space-x-2 sm:space-x-3 items-center px-3 py-2 bg-white text-pink-400 border-2 border-pink-100 rounded-lg shadow-sm hover:bg-pink-50 transition-all">
              <FaWallet className="text-pink-400" />
              <p className="text-sm sm:text-base font-medium">View Expenses</p>
            </li>
          </Link>
        </ul>
      </nav>

      {/* Form */}
      <div className="mt-8 px-3">
        <h1 className="text-3xl sm:text-3xl font-[Dancing_Script] font-medium text-center mb-4">
          {editingId ? "Edit Expense" : "Add Expenses"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-xl mx-auto"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-4 w-full h-10 rounded-lg bg-gray-50 text-pink-300 px-2 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
            placeholder="Title"
            required
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-4 w-full h-10 rounded-lg bg-gray-50 text-pink-300 px-2 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
            placeholder="Amount (GHS)"
            required
            min={0}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-4 w-full h-10 rounded-lg bg-gray-50 text-pink-400 px-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
            required
          >
            <option value="">Select category</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Home">Home</option>
            <option value="Transportation">Transportation</option>
            <option value="Education">Education</option>
            <option value="Relationships">Relationships</option>
            <option value="Work">Work</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border-4 w-full h-10 rounded-lg bg-gray-50 text-pink-300 px-2 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-8"
            required
          />
          <input
            type="submit"
            value={editingId ? "Save Changes" : "Add Expense"}
            className="bg-pink-400  text-white hover:bg-pink-500 font-bold px-2 py-1.5 text-center w-full h-10 rounded-lg hover:text-gray-50 transition-all"
          />
        </form>

        {/* Expenses List */}
        <div className="mt-10 text-center bg-gray-50 p-5 w-full max-w-3xl mx-auto rounded-lg">
          <h2 className="text-2xl font-semibold text-pink-400 mb-4">
            Your Expenses
          </h2>
          {expenses.length === 0 ? (
            <p className="text-pink-300">No expenses yet</p>
          ) : (
            <ul className="space-y-3">
              {expenses.map((exp) => (
                <li
                  key={exp.id}
                  className="bg-white border border-pink-100 rounded-lg mx-auto p-3 text-pink-400 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm sm:text-base"
                >
                  <div className="text-left mb-3 sm:mb-0">
                    <p className="font-bold">{exp.title}</p>
                    <p>Amount: {exp.amount}</p>
                    <p>Category: {exp.category}</p>
                    <p>Date: {exp.date}</p>
                  </div>
                  <div className="flex justify-center sm:justify-end gap-4">
                    <FaEdit
                      onClick={() => handleEdit(exp.id)}
                      className="text-blue-400 hover:text-blue-600 cursor-pointer text-lg"
                    />
                    <FaTrash
                      onClick={() => handleDelete(exp.id)}
                      className="text-red-400 hover:text-red-600 cursor-pointer text-lg"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
