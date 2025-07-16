import { format } from "date-fns";
import { Trash } from "lucide-react";

export default function ModelBox({ icon, name, amount, date, BoxName, onDeleteClick }) {
  const formatted = format(new Date(date), "dd MMM yyyy");

  return (
    <div className="relative bg-white shadow rounded p-4 flex items-center justify-between group hover:shadow-md transition">
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-500 text-sm">{formatted}</p>
        </div>
      </div>

      <div className={`${BoxName === 'Income' ? 'text-green-600' : 'text-red-600'} text-xl font-bold`}>
        Rs {amount}
      </div>

      {/* Delete icon on hover */}
      <button
        onClick={onDeleteClick}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Delete"
      >
        <Trash className="text-red-500" size={18} />
      </button>
    </div>
  )
};
