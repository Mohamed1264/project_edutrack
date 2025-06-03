import { toast } from "react-toastify";
import { CheckCheck, CircleAlert, CircleX, X } from "lucide-react";

function CustomToast({ message, closeToast, toastProps }) {
  const icons = {
    success: <CheckCheck size={20} className="mr-2" />,
    error: <CircleX size={20} className="mr-2" />,
    info: <CircleAlert size={20} className="mr-2 text-blue-700 dark:text-blue-50" />,
    default: <CircleAlert size={20} className="mr-2" />,
  };

  const bgColors = {
    success: "bg-green-200/50 dark:bg-green-700/50",
    error: "bg-red-200/50 dark:bg-red-700/50",
    info: "bg-blue-300/70 dark:bg-blue-800/50",
    default: "bg-gray-200/50 dark:bg-gray-700/50",
  };

  const textColors = {
    success: "text-green-700 dark:text-green-50",
    error: "text-red-700 dark:text-red-50",
    info: "text-blue-700 dark:text-blue-50",
    default: "text-gray-700 dark:text-gray-50",
  };

  const type = toastProps?.type || 'default';

  return (
    <div className={`flex items-center justify-between rounded-md px-3 py-2 w-full ${bgColors[type]} ${textColors[type]} backdrop-blur-sm`}>
      <div className="flex items-center">
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
      
      <X
        className="cursor-pointer ml-3 hover:opacity-70 transition-opacity"
        onClick={closeToast}
        size={18}
      />
    </div>
  );
}

// Common toast options
const commonOptions = {
  position: 'bottom-right',
  icon: false,
  closeButton: false,
  pauseOnHover: false,
  hideProgressBar : true

};

export const successNotify = (msg, options = {}) => toast.success(
  <CustomToast message={msg} />,
  {
    ...commonOptions,
    className: `${commonOptions.className} bg-green-200/50 dark:bg-green-700/50`,
  
    autoClose: 3000,
    ...options
  }
);

export const dangerNotify = (msg, options = {}) => toast.error(
  <CustomToast message={msg} />,
  {
    ...commonOptions,
    className: `${commonOptions.className} bg-red-200/50 dark:bg-red-700/50`,
 
    autoClose: 5000,
    ...options
  }
);

export const InfoNotify = (msg, options = {}) => toast.info(
  <CustomToast message={msg} />,
  {
    ...commonOptions,
    className: `${commonOptions.className} !p-0 !bg-transparent`,
  
    autoClose: 4000,
    ...options
  }
);

export const defaultNotify = (msg, options = {}) => toast(
  <CustomToast message={msg} />,
  {
    ...commonOptions,
    className: `${commonOptions.className} !bg-gray-200/50 !dark:bg-gray-700/50`,
    autoClose: 3000,
    ...options
  }
);          
   