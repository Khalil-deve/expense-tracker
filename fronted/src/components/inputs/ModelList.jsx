import { useEffect, useState } from "react";
import PopUp from "./PopUp";
import ModelBox from "../ModelBox";
import { Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ModelList({ items, modelName }) {
    const [list, setList] = useState([]); // Manage local copy of items
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Sync list with props when items change
    useEffect(() => {
        setList(items);
    }, [items]);

    return (
        <>
            <Toaster position="top-right" />
            {list.map((item) => (
                <ModelBox
                    key={item._id}
                    icon={item.icon}
                    name={item.name}
                    amount={item.amount}
                    date={item.date}
                    BoxName={modelName}
                    onDeleteClick={() => {
                        setSelectedItem(item);
                        setShowDeleteModal(true);
                    }}
                />
            ))}

            {showDeleteModal && selectedItem && (
                <PopUp
                    title={`Delete ${selectedItem.name}`}
                    message={`Are you sure you want to delete this ${modelName.toLowerCase()}?`}
                    confirmColor="red"
                    confirmText="Delete"
                    onConfirm={async () => {
                        const token = localStorage.getItem("token");

                        try {
                            const res = await fetch(
                                `${import.meta.env.VITE_API_URL}/dash/${modelName.toLowerCase()}s/${selectedItem._id}`,
                                {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );

                            if (res.ok) {
                                toast.success(`${modelName} deleted successfully.`);
                                setList(prev => prev.filter(item => item._id !== selectedItem._id)); // remove from list
                            } else {
                                toast.error("Failed to delete item");
                            }
                        } catch (err) {
                            toast.error("Error while deleting");
                        } finally {
                            setShowDeleteModal(false);
                            setSelectedItem(null);
                        }
                    }}
                    onCancel={() => setShowDeleteModal(false)}
                    icon={<Trash size={20} />}
                />
            )}
        </>
    );
}
