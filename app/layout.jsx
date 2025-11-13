import "./globals.css";
import Navbar from "./components/navbar";

export const metadata = {
  title: "Qián - Your Financial Partner",
  description:
    "Expense Tracker, Budget Maker, Savings Tracker, Personal Finance App",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-[segoe_Script] bg-pink-200">
        <Navbar />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
