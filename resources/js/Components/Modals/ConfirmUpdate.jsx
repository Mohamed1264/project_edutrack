import { Check } from 'lucide-react';

const ConfirmUpdateModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemName = "item",
  confirmText = "Update Item",
  cancelText = "Cancel"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-md p-6 mx-4 text-center dark:bg-gray-900 bg-gray-50 rounded-lg shadow-xl">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full dark:bg-purple-900/40 bg-purple-100">
          <Check className="size-8 text-green-500" />
        </div>
        
        {/* Title */}
        <h3 className="mb-3 text-xl font-medium text-gray-700 dark:text-gray-50">Confirm Update</h3>
        
        {/* Message */}
        <p className="mb-8 dark:text-gray-300 text-gray-500">
          Are you sure you want to update {itemName}?
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium dark:text-gray-300 text-gray-500 bg-transparent border dark:border-gray-600 border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdateModal;
