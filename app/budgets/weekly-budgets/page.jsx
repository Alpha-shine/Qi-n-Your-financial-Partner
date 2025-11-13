import BudgetForm from "../../components/budget-form";
export default function WeeklyBudgetsPage() {
  return (
    <div className=" text-center mt-10 px-10 ">
      <h1 className="text-2xl font-semibold mb-8 ">
        Set Your Budget For the Week
      </h1>
      <BudgetForm />
    </div>
  );
}
