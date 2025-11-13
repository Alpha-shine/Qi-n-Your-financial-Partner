"use client";
import { useState, useEffect } from "react";
import Calculator from "../components/calculator";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function SavingsPage() {
  const [savings, setSavings] = useState([]);
  const [goal, setGoal] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [editId, setEditId] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedData = JSON.parse(localStorage.getItem("savings")) || [];
      setSavings(savedData);
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("savings", JSON.stringify(savings));
    }
  }, [savings, isClient]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updated = savings.map((item) =>
        item.id === editId
          ? {
              ...item,
              goal,
              target: parseFloat(target),
              saved: parseFloat(saved),
            }
          : item
      );
      setSavings(updated);
      setEditId(null);
    } else {
      const newGoal = {
        id: Date.now(),
        goal,
        target: parseFloat(target),
        saved: parseFloat(saved),
      };
      setSavings([...savings, newGoal]);
    }

    setGoal("");
    setTarget("");
    setSaved("");
  };

  const handleDelete = (id) => {
    const updated = savings.filter((item) => item.id !== id);
    setSavings(updated);
  };

  const handleEdit = (goalItem) => {
    setGoal(goalItem.goal);
    setTarget(goalItem.target);
    setSaved(goalItem.saved);
    setEditId(goalItem.id);
  };

  const totalTarget = savings.reduce((acc, g) => acc + g.target, 0);
  const totalSaved = savings.reduce((acc, g) => acc + g.saved, 0);
  const totalPercentage =
    totalTarget > 0 ? Math.min((totalSaved / totalTarget) * 100, 100) : 0;

  if (!isClient) return null;

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 mt-10 px-4 sm:px-8">
      {/* Left: Savings Form */}
      <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-3xl font-[Dancing_Script] font-medium mb-4 text-pink-400">
          Track Your Savings
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border-4 w-full sm:w-[80%] h-10 rounded-lg bg-gray-50 text-pink-300 px-3 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
            placeholder="Goal Name"
            required
          />
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border-4 w-full sm:w-[80%] h-10 rounded-lg bg-gray-50 text-pink-300 px-3 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
            placeholder="Target Amount (GHS)"
            required
            min={0}
          />
          <input
            type="number"
            value={saved}
            onChange={(e) => setSaved(e.target.value)}
            className="border-4 w-full sm:w-[80%] h-10 rounded-lg bg-gray-50 text-pink-300 px-3 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-8"
            placeholder="Saved Amount (GHS)"
            required
            min={0}
          />

          <input
            type="submit"
            value={editId ? "Update Goal" : "Add Goal"}
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-2 py-1.5 text-center w-full sm:w-[80%] h-10 rounded-lg hover:text-gray-50 transition-all"
          />
        </form>

        {/* Total Progress */}
        <div className="mt-8 bg-gray-50 p-5 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-pink-400 mb-2">
            Total Savings Progress
          </h2>
          <progress
            className="progress progress-secondary w-full sm:w-[80%]"
            value={totalPercentage}
            max="100"
          ></progress>
          <p className="text-pink-400 mt-2 font-medium">
            {totalPercentage.toFixed(1)}% saved
          </p>
        </div>

        {/* Saved Goals */}
        <div className="mt-10 bg-gray-50 p-5 rounded-lg">
          <h2 className="text-2xl font-semibold text-pink-400 mb-4">
            Your Savings Goals
          </h2>

          {savings.length === 0 ? (
            <p className="text-pink-300">No savings added yet</p>
          ) : (
            <ul className="space-y-3">
              {savings.map((item) => {
                const completed = item.saved >= item.target;
                const percent = Math.min(
                  (item.saved / item.target) * 100,
                  100
                ).toFixed(1);

                return (
                  <li
                    key={item.id}
                    className={`${
                      completed ? "bg-pink-100" : "bg-white"
                    } border border-pink-100 rounded-lg p-4 text-pink-400 text-left`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <p className="font-bold text-lg">{item.goal}</p>
                        <p>Target: GHS {item.target}</p>
                        <p>Saved: GHS {item.saved}</p>
                        {completed && (
                          <p className="text-green-600 font-semibold">
                            Completed!
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end sm:justify-center gap-4 mt-3 sm:mt-0">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-pink-400 hover:text-pink-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <progress
                        className="progress progress-accent w-full h-3"
                        value={percent}
                        max="100"
                      ></progress>
                      <p className="text-sm text-pink-400 mt-1">
                        {percent}% saved
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Right: Calculator */}
      <div className="w-full lg:w-1/2 flex justify-center items-start">
        <Calculator />
      </div>
    </div>
  );
}
