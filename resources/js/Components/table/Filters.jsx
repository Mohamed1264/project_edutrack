import { filieres, groups } from "../../Data/Users"
import { RefreshCcw, X } from "lucide-react"
import {  DateField } from "../form/Fields";
import { Select } from "../form/Select";
import {RatioField} from "../form/RatioField";
import {CustomSelect } from "../form/CustomSelect";
import { useState, useEffect } from "react";

export default function Filter2({ filterBy, setFilterTerms, filterTerms, setShowFilters }) {
  // Local state to track temporary filter changes
  const [localFilters, setLocalFilters] = useState(filterTerms);
  console.log(localFilters);
  
  // Update local filters when filterTerms prop changes
  useEffect(() => {
    setLocalFilters(filterTerms);
  }, [filterTerms]);

  const handleChange = (name , value) => {
   
    const newFilters = { ...localFilters };

    // Handle date fields
    if (name === 'to' || name === 'from') {
      if (!value) {
        delete newFilters[name];
      } else {
        newFilters[name] = value.split('/').reverse().join('-');
      }
    } 
    // Handle number fields
    else if (name.startsWith('min') || name.startsWith('max')) {
      if (value === '') {
        delete newFilters[name];
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          newFilters[name] = numValue;
        }
      }
    }
    // Handle other fields
    else if (value) {
      newFilters[name] = value;
    } else {
      delete newFilters[name];
    }

    setLocalFilters(newFilters);
  };

  const handleReset = (filterType) => {
    const newFilters = { ...localFilters };

    switch (filterType) {
      case 'age':
        delete newFilters.minAge;
        delete newFilters.maxAge;
        break;
      case 'totalAbsence':
        delete newFilters.minTotalAbsence;
        delete newFilters.maxTotalAbsence;
        break;
      case 'numberStudents':
        delete newFilters.minNumberStudents;
        delete newFilters.maxNumberStudents;
        break;
      case 'date':
        delete newFilters.to;
        delete newFilters.from;
        break;
      default:
        delete newFilters[filterType];
        break;
    }

    setLocalFilters(newFilters);
  };

  const handleApply = () => {
    setFilterTerms(localFilters);
    setShowFilters(false);
  };

  const handleClear = () => {
    setLocalFilters({});
    setFilterTerms({});
    setShowFilters(false);
  };

  const renderRangeInput = (label, minName, maxName, minValue, maxValue, placeholder) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-50">{label}</label>
        <button 
          onClick={() => handleReset(minName.replace('min', '').toLowerCase())}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50"
        >
          <RefreshCcw size={16} />
        </button>
      </div>
      <div className="flex gap-4">
        <input
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-slate-800 text-sm outline-none focus:ring-1 focus:ring-purple-700 dark:focus:bg-gray-700"
          type="number"
          value={minValue || ''}
          name={minName}
          onChange={(e) => handleChange(minName, e.target.value)}
          placeholder={`Min ${placeholder}`}
        />
        <input
          className="flex-1 border rounded-md px-3 py-2 border-gray-300 dark:border-gray-600 text-sm bg-gray-50 dark:bg-slate-800 outline-none focus:ring-1 focus:ring-purple-700 dark:focus:bg-gray-700"
          type="number"
          name={maxName}
          value={maxValue || ''}
          onChange={(e)=>handleChange(maxName, e.target.value)}
          placeholder={`Max ${placeholder}`}
        />
      </div>
    </div>
  );

  const renderGenderFilter = () => (
    <RatioField 
      name="gender"
      label="Gender"
      items={['Male', 'Female']}
      handleChange={handleChange}
      value={localFilters.gender}

    />
    
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-50">Filters</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* filiere filter */}
        {Array.from(filterBy).includes('filiere') && (
          <CustomSelect
            items={filieres}
            label="Filieres"
            name="filiere"
            handleChange={handleChange}
            value={localFilters.filiere}
            placeholder="Select filiere"
          />
        )}

        {/* year filter */}
        {Array.from(filterBy).includes('year') && (
          <RatioField 
            name="year"
            label="Years"
            items={['First Year', 'Second Year', 'Third Year']}
            handleChange={handleChange}
            value={localFilters.year}
          />
        )}

        {/* niveau filter */}
        {Array.from(filterBy).includes('niveau') && (
          <Select
            items={['Technicien Specialise', 'Technicien', 'Qualification', 'Specialisation']}
            label="Niveaux"
            value={localFilters.niveau}
            handleChange={handleChange}
            placeholder="Select Niveau"
            name="niveau"
          />
        )}

        {/* gender filter */}
        {Array.from(filterBy).includes('gender') && renderGenderFilter()}

        {/* group filter */}
        {Array.from(filterBy).includes('groups') && (
          <CustomSelect
            items={groups}
            label="Groups"
            name="group"
            handleChange={handleChange}
            value={localFilters.group}
            placeholder="Select Group"
          />
        )}

        {/* age filter */}
        {Array.from(filterBy).includes('age') && 
          renderRangeInput(
            'Age Range',
            'minAge',
            'maxAge',
            localFilters.minAge,
            localFilters.maxAge,
            'age'
          )
        }

        {/* totalAbsence filter */}
        {Array.from(filterBy).includes('totalAbsence') && 
          renderRangeInput(
            'Total Absences',
            'minTotalAbsence',
            'maxTotalAbsence',
            localFilters.minTotalAbsence,
            localFilters.maxTotalAbsence,
            'absences'
          )
        }
        {
          Array.from(filterBy).includes('numberStudents') &&
          renderRangeInput(
            'Number Students',
            'minNumberStudents',
            'maxNumberStudents',
            localFilters.minNumberStudents,
            localFilters.maxNumberStudents,
            'numberStudents'
          )
        }

        {/* status filter */}
        {Array.from(filterBy).includes('status') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Type Absence</label>
              <button 
                onClick={() => handleReset('status')}
                className="text-gray-400 hover:text-gray-600"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Absent', 'Late'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleChange({ target: { name: 'status', value: status } })}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors
                    ${localFilters.status === status 
                      ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' 
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* justify filter */}
        {Array.from(filterBy).includes('justified') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Is Justified</label>
              <button 
                onClick={() => handleReset('justified')}
                className="text-gray-400 hover:text-gray-600"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleChange({ target: { name: 'justified', value: option } })}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors
                    ${localFilters.justified === option 
                      ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100' 
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* date filter */}
        {Array.from(filterBy).includes('date') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Date Range</label>
              <button 
                onClick={() => handleReset('date')}
                className="text-gray-400 hover:text-gray-600"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
            <DateField
              name="from"
              handleChange={handleChange}
              handleFocus={() => {}}
              label="From Date"
              value={localFilters.from}
            />
            <DateField
              name="to"
              handleChange={handleChange}
              handleFocus={() => {}}
              label="To Date"
              value={localFilters.to}
            />
          </div>
        )}
      </div>

      <div className="border-t border-gray-300 dark:border-gray-600 p-4 bg-gray-100 dark:bg-gray-800 space-x-3">
        <button
          onClick={handleClear}
          className="px-4 py-2 text-sm text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-50"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 text-sm bg-purple-700 text-purple-50 rounded-lg hover:bg-purple-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}