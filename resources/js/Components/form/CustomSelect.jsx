import React from 'react';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

export function CustomSelect({
  name,
  label,
  value = null,           // now expects an object or null
  handleChange,
  options = [],          // array of objects, each with at least { value, label }
  placeholder = 'Select an option',
  icon = null,
}) {
  console.log(options[0].label);
  

  return (
    <div className="w-full space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={(selected) => handleChange(name, selected)}>
        <div className="relative">
          <Listbox.Button
            className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm 
            focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 flex items-center justify-between"
          >
            <span className="flex items-center space-x-2">
              {icon && <span className="text-gray-400">{icon}</span>}
              <span className="block truncate">
                {value ? value.label : placeholder}
              </span>
            </span>
            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg 
            ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800">
            {options.length === 0 && (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
                No options available
              </div>
            )}
            {options.map((option) => (
              <Listbox.Option
                key={option.label}
                value={option}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active
                      ? 'bg-purple-100 text-purple-900 dark:bg-purple-600 dark:text-white'
                      : 'text-gray-900 dark:text-gray-100'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600 dark:text-purple-300">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
