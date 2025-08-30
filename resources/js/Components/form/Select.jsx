import { FieldContainer } from "./GlobalComponents"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import useClickOutSide from "../../utils/Hooks/useClickOutSide"
export const Select = ({label ,handleChange , placeholder ,name , value,items}) =>{
    return (
        <FieldContainer label={label}>
             <select
                value={value}
                onChange={({target}) => handleChange(name,target.value)}
                className={`
                bg-gray-50 dark:bg-gray-800/70
                block px-4 py-2 w-full appearance-none  rounded-lg 
                ${!value && 'text-gray-300 dark:text-gray-600'}
               
                border border-gray-300 dark:border-gray-600 
                focus:outline-none focus:ring-0 focus:border-purple-600 dark:focus:border-purple-600`}
              >
                <option value="" disabled selected className="text-gray-300 dark:text-gray-600">{placeholder}</option>
                {
                    items.map (item =>  
                    <option key={item} className="text-gray-700 dark:text-gray-50" value={item}>
                      {item}
                    </option>
                    )
                }
              </select>
        </FieldContainer>
    )
}
export const SelectInput = ({handleChange , placeholder , value,items,labelKey,valueKey,name}) =>{
    const selectedValueLabel = items.find(item => item[valueKey]== value) 
    const [selectMenu, setSelectMenu] = useState(false)
      const selectRef = useRef(null)
      useClickOutSide(()=>setSelectMenu(false),selectRef);
      const handleSelect = (value)=>{
 
        handleChange(name,value)
        setSelectMenu(false)
      }
     
    return (
      <div className="relative z-10 min-w-56 w-full flex-1" ref={selectRef}>
      <button
          onClick={() => setSelectMenu(!selectMenu)}
          type="button"
          className={`flex items-center w-full justify-between gap-2 px-3 py-2.5 rounded-lg 
                      border ${selectMenu ? 'border-purple-600 dark:border-purple-600' : 'border-gray-300 dark:border-gray-600'} 
                      bg-gray-50 dark:bg-gray-800/70  hover:bg-gray-50 dark:hover:bg-gray-800/60
                      text-sm font-medium ${value ? 'text-gray-700 dark:text-gray-50' : 'text-gray-300 dark:text-gray-600'} 
                      transition-colors
          `}
      >
          <div className="flex items-center ">
              {!selectedValueLabel  ? placeholder : selectedValueLabel[labelKey]}
          </div>
          <ChevronDown className={`w-4 h-4 duration-500 ${selectMenu ? 'rotate-180' : ''}`} />
      </button>
      {selectMenu && (
          <div
              
              className="absolute right-0 mt-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
          >
              <button
                     
                      type="button"
                      disabled
                      className={`w-full px-4 py-2 text-left text-sm font-medium text-gray-300 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed rounded-t-lg `}
                  >
                      {placeholder}
                  </button>
              {
                items.map((item , index) => (
                  <button
                    key={`${item[valueKey]}-${index}`}
                    type="button"
                    onClick={() => handleSelect(item[valueKey])}

                    className={`w-full px-4 py-2 text-left text-sm font-medium
                        ${value === item[valueKey] ? 
                        'bg-purple-100 dark:bg-purple-600 text-purple-700 dark:text-white hover:bg-purple-200 dark:hover:bg-purple-700' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                        } 
                        transition-colors 
                        ${index === items.length - 1 ? 'rounded-b-lg' : ''}
                    `}
                    value={item[valueKey]}
                    >
                        {item[labelKey]}
                    </button>

              ))}
          </div>
      )}
</div>
      
    )
}

export const SelectField = ({ label, handleChange, placeholder, name, value, items, labelKey = "option", valueKey = "value" }) => {
const handleSelect = (selectedValue,index) => {
  handleChange(name, index); 
};
  return (
    <FieldContainer label={label}>
      <SelectInput 
        handleChange={handleSelect} 
        placeholder={placeholder} 
        value={value} 
        items={items}
        labelKey={labelKey}
        valueKey={valueKey}
        name={name}
      />
    </FieldContainer>
  );
};

