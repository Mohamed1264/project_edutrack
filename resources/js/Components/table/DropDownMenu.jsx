import { Link } from "@inertiajs/react";
import { useModalContext } from "../../utils/Context/ModalContext";
import { CalendarFold, Edit, RefreshCcw, SquareArrowOutUpRight, Trash2 } from "lucide-react";

const icon_size = 16;
const actionsIcons = {
  edit: <Edit size={icon_size} />,
  profile: <SquareArrowOutUpRight size={icon_size} />,
  delete: <Trash2 size={icon_size} />,
  schedule: <CalendarFold size={icon_size} />,
  resetPassword: <RefreshCcw size={icon_size} />
};

const actionsTitles = {
  edit: 'Edit',
  profile: 'Profile',
  delete: 'Delete',
  schedule: 'Schedule',
  resetPassword: 'Reset Password'
};

function DropDownMenu({ style, config }) {
  const { links, modals, key, path } = config;
  const { selectedItem, setActiveModal } = useModalContext();
  const linksKeys = Object.keys(links);

  return (
    <div 
      className="absolute min-w-[180px] z-50 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm" 
      style={style}
    >
      <div className="p-1.5 space-y-0.5">
        {linksKeys.map(linkKey => (
          <Link
            key={linkKey}
            href={`${path}/${links?.[linkKey]}/${selectedItem?.[key]}`}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
              text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20
              hover:text-purple-700 dark:hover:text-purple-400"
          >
            <span className="text-gray-400 dark:text-gray-500 group-hover:text-purple-500">
              {actionsIcons?.[linkKey]}
            </span>
            {actionsTitles[linkKey]}
          </Link>
        ))}
        {modals.map(modal => (
          <button
            key={modal}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
              ${modal === 'delete' 
                ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-400'
              }`}
            onClick={() => setActiveModal(modal)}
          >
            <span className={`${modal === 'delete' ? 'text-red-400 dark:text-red-500' : 'text-gray-400 dark:text-gray-500'} group-hover:text-purple-500`}>
              {actionsIcons[modal]}
            </span>
            {actionsTitles[modal]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DropDownMenu;