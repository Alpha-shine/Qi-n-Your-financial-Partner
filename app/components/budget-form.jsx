export default function BudgetForm() {
  return (
    <div className="text-center mt-10 px-10 ">
      <form className="flex flex-col items-center">
        <input
          type="text"
          className="border-4 block w-[50vw] h-10 rounded-lg bg-gray-50 text-pink-300 px-3 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
          placeholder="Budget Name"
          required
        />
        <input
          type="number"
          className="border-4 block w-[50vw] h-10 rounded-lg bg-gray-50 text-pink-300 px-3 py-2 font-[Dancing_Script] text-lg font-bold border-pink-100 mb-4"
          placeholder="Target Amount (GHS)"
          required
          min={0}
        />
        <select
          className="border-4 block w-[50vw] h-10 rounded-lg bg-gray-50 text-pink-400 px-2  font-[Dancing_Script] text-lg font-bold border-pink-100 mb-8"
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
          type="submit"
          className="bg-gray-50 border-4 border-pink-100 text-pink-600 hover:bg-pink-300 font-bold px-2 py-1.5 text-center w-[50vw] h-10 rounded-lg hover:text-gray-50 transition-all"
        />
      </form>
    </div>
  );
}
