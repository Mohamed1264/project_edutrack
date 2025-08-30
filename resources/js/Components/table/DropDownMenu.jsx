import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import DeleteModal from "../Modals/DeleteModal";
import { route } from 'ziggy-js';
import {
  Eye, Pencil, Trash2, Lock, User, Info, MoreHorizontal, LogOut, Settings, ChevronRight
} from "lucide-react";

const iconMap = {
  view: <Eye size={18} className="text-blue-500" />,
  edit: <Pencil size={18} className="text-emerald-500" />,
  delete: <Trash2 size={18} className="text-rose-500" />,
  reset: <Lock size={18} className="text-violet-500" />,
  profile: <User size={18} className="text-indigo-500" />,
  info: <Info size={18} className="text-cyan-500" />,
  settings: <Settings size={18} className="text-gray-500" />,
  logout: <LogOut size={18} className="text-amber-500" />,
};

export default function DropDownMenu({ config, item, position = "right-0" }) {
  const { links = {}, modals = [], primaryKey, path } = config || {};
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  console.log(config);
  
  const handleDelete = () => {
    console.log(path);
    
    router.delete(route(path +'.destroy', item?.[primaryKey]), {
      onSuccess: () => setShowDeleteModal(false),
      onError: () => setShowDeleteModal(false),
    });
  };

  const handleItemClick = (action) => {
    if (action === "delete") {
      setShowDeleteModal(true);
    }
    // Add other specific actions if needed
  };

  const renderMenuItem = (label, icon, onClick, hasSubmenu = false) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg ${
        label.toLowerCase() === "delete" ? "text-rose-600 dark:text-rose-400" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="capitalize font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      </div>
      {hasSubmenu && <ChevronRight size={16} className="text-gray-400" />}
    </button>
  );

  return (
    <>
      <div className={`absolute ${position} mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 w-64 z-50 animate-fade-in`}>
        <ul className="space-y-1">
          {Object.entries(links).map(([label, routeName], index) => {
            const icon = iconMap[label.toLowerCase()] || <MoreHorizontal size={18} />;
            
            return (
              <li key={index}>
                {label.toLowerCase() === "delete" ? (
                  renderMenuItem(label, icon, () => handleItemClick("delete"))
                ) : (
                  <Link
                    href={route(routeName, item?.[primaryKey])}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg"
                  >
                    {icon}
                    <span className="capitalize font-medium text-gray-700 dark:text-gray-300">
                      {label}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}

          {modals && modals.filter((modal) => typeof modal?.label === "string")
            .map((modal, index) => {
              const label = modal.label.toLowerCase();
              const icon = iconMap[label] || <MoreHorizontal size={18} />;
              
              return (
                <li key={`modal-${index}`}>
                  {renderMenuItem(modal.label, icon, modal.open, modal.submenu)}
                </li>
              );
            })}
        </ul>

      </div>

      {showDeleteModal && (
        <DeleteModal
          name={item?.full_name}
          itemName={item?.full_name}
          handleDelete={handleDelete}
          resetModal={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}