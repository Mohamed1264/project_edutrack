import { toast } from "react-toastify"



import { CheckCheck, CircleAlert, CircleX,X} from "lucide-react";

function CustomToast ({message, closeToast, toastProps}) {
            const icons = {
               success :  <CheckCheck size={20} className=" mr-2 text-2xl" />,
               error :  <CircleX size={20} className=" mr-2 text-2xl" />,
               info :  <CircleAlert size={20} className=" mr-2 text-2xl" />,
            }
            return (
            <div className={`flex items-center justify-between rounded-md px-3 py-2 w-full`}>
              <div className="flex items-center ">
              {icons[toastProps.type]}
              <span className="text-sm font-bold">{message}</span>
         
              </div>
              
              {/* Custom Close Button */}
              <X
                className={` cursor-pointer ml-3 text-xl`}
                onClick={closeToast}
              />
            </div>
)}

export const successNotify  = (msg)=> toast.success(<CustomToast message={msg}/>,
                { 
                position: 'bottom-right',
                className: 'p-0 w-76 bg-green-200/50 dark:bg-green-700/50 backdrop-blur-sm text-green-700 dark:text-green-50',
                icon : false,
                progressClassName: "bg-green-700 dark:bg-green-50",
                autoClose: 3000,
                pauseOnHover : false,
                closeButton : false,
                
                }
)

export const dangerNotify  = (msg)=> toast.error(<CustomToast message={msg}/>,
  { 
  position: 'bottom-right',
  className: 'p-0 w-76 bg-red-200/50 dark:bg-red-700/50 backdrop-blur-sm text-red-700 dark:text-red-50',
  icon : false,
  progressClassName: "bg-red-700 dark:bg-red-50",
  
  }
)
               
                  
   