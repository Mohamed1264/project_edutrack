export const RatioField = ({ name, label, items, handleChange, value }) => {
    const gridCols = items.length === 3 ? 'grid-cols-3' : 'grid-cols-2';
    const handleClick = (item,name) => {
      if(item !== value){
        handleChange(name,item)
      }
    }
    return (
      <div className="space-y-2 w-full mt-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
        <div className={`grid ${gridCols} gap-2`}>
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleClick(item,name)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors
                ${value === item 
                  ? 'bg-purple-100 text-purple-700 border-purple-700 hover:bg-purple-200 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 dark:border-purple-700 dark:text-purple-700' 
                  : 'text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      
      </div>
    );
  };

