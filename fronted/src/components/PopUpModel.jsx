import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function PopUpModel({ onClose, ModelName, apiRoute, onSave }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [icon, setIcon] = useState("");
  const [date, setDate] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

  const handleEmojiClick = (emojiData) => {
    setIcon(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name){
      toast.error("Please enter a valid name.");
      return;
    }
    if(!amount){
      toast.error("Please enter a valid amount.");
      return;
    }
    if(!icon){
      toast.error("Please select an icon.");
      return;
    }
    if(!date){
      toast.error("Please select a date.");
      return;
    }

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("User not authenticated.");
      return;
    }
    console.log('the api route is: ', apiRoute);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${apiRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // optional if you use token
        },
        body: JSON.stringify({ name: name.toLowerCase(), amount: Number(amount), icon, date, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const data = await response.json();
      toast.success(`${ModelName} added successfully!`);
      onSave(data); // Call the onSave callback with the new data
      onClose(); // Close the modal
      navigate(`/dashboard/${ModelName.toLowerCase()}`); // Redirect to the model's page
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while saving.");
    }
  };

  return (
    <div className="fixed w-full inset-0 flex justify-center items-center z-50">
       <Toaster position="top-right" />
      <div className="bg-gray-100 p-6 rounded-lg shadow w-full max-w-md relative">
        <h3 className="text-xl font-semibold mb-4">Add New {ModelName}</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              {icon || "Select Icon"}
            </button>
            {showEmojiPicker && (
              <div className="absolute top-full mt-2 z-50">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder={`${ModelName} Name`}
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount (Rs)"
            className="w-full border p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
