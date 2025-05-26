import { useState, useRef, useEffect } from "react";
import { Filter, X } from "lucide-react";
import Filter2 from "./Filters";
import { useTableContext } from "../../utils/Context/TableContext";
export default function FilterSection({filterby}) {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);
  const {activeFilters,setActiveFilters} = useTableContext()

  // Handle click outside to close filter
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={filterRef}>
      <button 
        className={`flex items-center gap-2 px-2 py-2 rounded-lg border ${
          Object.keys(activeFilters).length > 0 
            ? ' bg-purple-300 border-purple-200 text-purple-700 hover:bg-purple-200 dark:text-purple-50 dark:bg-purple-700 dark:border-purple-600 dark:hover:bg-purple-600' 
            : 'text-gray-700 dark:text-gray-300 dark:hover:text-gray-50 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter size={18} />
        {Object.keys(activeFilters).length > 0 && (
          <span className="text-sm">
            {Object.keys(activeFilters).length} {Object.keys(activeFilters).length === 1 ? 'Filter' : 'Filters'} Applied
          </span>
        )}
      </button>

      {showFilters && (
        <div className="fixed inset-0 z-40 overflow-hidden bg-black bg-opacity-20">
          <div className="fixed right-0 top-0 h-full w-1/2 transform bg-gray-50 dark:bg-gray-900 border-l border-gray-300 dark:border-gray-600 transition-transform duration-300 ease-in-out">
            <Filter2 
              filterBy={filterby}
              filterTerms={activeFilters}
              setFilterTerms={setActiveFilters}
              setShowFilters={setShowFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function AppliedFilters({ columns }) {
  const {activeFilters,setActiveFilters} = useTableContext()
  if (Object.keys(activeFilters).length === 0) {
    return null;
  }

  const getFilterLabel = (field, value) => {
    // Handle range filters (age)
    if (field === 'minAge') return `Min Age: ${value}`;
    if (field === 'maxAge') return `Max Age: ${value}`;
    if (field === 'from') return `From: ${value}`;
    if (field === 'to') return `To: ${value}`;
    if (field === 'minTotalAbsence') return `Min Absences: ${value}`;
    if (field === 'maxTotalAbsence') return `Max Absences: ${value}`;
    if (field === 'minNumberStudents') return `Min Number Students: ${value}`;
    if (field === 'maxNumberStudents') return `Max Number Students: ${value}`;
    

    // Get column header for the field
    const column = columns.find(col => col.field === field);
    return `${column?.header || field}: ${value}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {Object.entries(activeFilters).map(([field, value]) => {
        if (!value) return null;
        
        return (
          <div 
            key={field} 
            className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-300 text-purple-700 dark:bg-purple-700 dark:text-purple-50  rounded-full text-sm"
          >
            <span>{getFilterLabel(field, value)}</span>
            <button
              onClick={() => {
                const newFilters = { ...activeFilters };
                delete newFilters[field];
                setActiveFilters(newFilters);
              }}
              className="hover:text-blue-800 dark:hover:text-purple-600 p-0.5"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
      
      <button
        onClick={() => setActiveFilters({})}
        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-50 hover:underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
}