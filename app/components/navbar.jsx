"use client";
import { useState } from "react";
import { FaChevronDown, FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="bg-gray-50 flex items-center justify-between px-5 h-[8vh] shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FaMoneyBillWave className="text-pink-300 scale-120" />
        <Link href="/">
          <div className="font-[Dancing_Script] font-black text-3xl">Qián</div>
        </Link>
        <FaMoneyBillWave className="text-pink-300 scale-120" />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-5 relative">
        {/* Dashboard */}
        <Link href="/">
          <div className="hover:text-pink-400 transition-colors">Dashboard</div>
        </Link>

        {/* Expenses */}
        <Link href="/expenses">
          <div className="hover:text-pink-400 transition-colors">Expenses</div>
        </Link>

        {/* Budgets Dropdown */}
        <div
          className="relative"
          // onMouseEnter={() => setIsOpen(true)}
          // onMouseLeave={() => setIsOpen(false)}
        >
          <button
            onClick={toggleDropdown}
            className="flex items-center hover:text-pink-400 transition-colors"
          >
            Budgets
            <FaChevronDown
              className={`ml-1 mt-0.5 text-pink-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute top-8 left-0 bg-white border border-pink-100 shadow-lg rounded-lg w-36 py-2 z-50 animate-fadeIn"
              onMouseLeave={() => setIsOpen(false)}
            >
              <Link
                href="/budgets/daily-budgets"
                className="block px-4 py-2 text-pink-400 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                Daily
              </Link>
              <Link
                href="/budgets/weekly-budgets"
                className="block px-4 py-2 text-pink-400 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                Weekly
              </Link>
              <Link
                href="/budgets/monthly-budgets"
                className="block px-4 py-2 text-pink-400 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              >
                Monthly
              </Link>
            </div>
          )}
        </div>

        {/* Savings */}
        <Link href="/savings">
          <div className="hover:text-pink-400 transition-colors">Savings</div>
        </Link>
      </div>
    </div>
  );
}
