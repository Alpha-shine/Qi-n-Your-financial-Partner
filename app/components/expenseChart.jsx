"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Group expenses by day
    const grouped = savedExpenses.reduce((acc, expense) => {
      const date = new Date(expense.date);
      const day = date.toLocaleDateString("en-US", { weekday: "short" }); // e.g. Mon, Tue
      if (!acc[day]) acc[day] = 0;
      acc[day] += parseFloat(expense.amount);
      return acc;
    }, {});

    // Create a data array suitable for Recharts
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const formattedData = weekDays.map((day) => ({
      name: day,
      amount: grouped[day] || 0,
    }));

    setChartData(formattedData);
  }, []);

  return (
    <div
      className="flex justify-center
    "
    >
      <div className="bg-white border border-pink-100 rounded-lg p-4 w-[90vw] max-w-[600px]">
        <h1 className="text-center text-pink-400 text-2xl font-semibold mb-4">
          Weekly Expense Overview
        </h1>

        <ResponsiveContainer width="100%" aspect={1.618}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              bottom: 5,
              left: 0,
            }}
          >
            <CartesianGrid stroke="#f0cfe0" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#ec4899"
              strokeWidth={3}
              name="Expenses (GHS)"
            />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: "Amount (GHS)",
                position: "insideLeft",
                angle: -90,
              }}
            />
            <Legend align="right" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
