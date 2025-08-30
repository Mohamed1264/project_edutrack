import { Link } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";   
import { useModalContext } from "../../utils/Context/ModalContext";
import { TextField } from "../form/Inputs";

export default function ProfileComponents({ 
    item, 
    title, 
    fields, 
    editPath, 
    type 
}) {
    // ✅ Safe context call to avoid destructuring errors
    const modalCtx = useModalContext?.();
    const setActiveModal = modalCtx?.setActiveModal;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <div className="flex items-center gap-3">
                    {/* ✅ Inertia Link uses href instead of to */}
                    <Link
                        href={`${editPath}/${item.id}`}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-purple-600 dark:text-purple-400 
                            hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                    >
                        <Edit size={16} />
                        Edit
                    </Link>
                    <button
                        onClick={() => setActiveModal && setActiveModal('delete')}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 
                            hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            </div>

            {/* Fields */}
            <div className="p-6 space-y-4">
                {fields.map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        value={item?.[field.accessor] ?? ""}
                        disabled={true}
                        name={field.name}
                        handleChange={() => {}}
                        handleFocus={() => {}}
                        error={false}
                        icon={field.icon}
                        placeHolder={`Enter ${field.label}`}
                    />
                ))}
            </div>
        </div>
    );
}