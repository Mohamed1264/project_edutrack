import { Link } from '@inertiajs/react';
import { groups } from '../../Data/Users';
import SearchBar from '../../Components/Common/SearchBar';
import { useState, useRef } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import Layout from "../../layouts/Layout";

const years = ['All', 'First Year', 'Second Year', 'Third Year'];

export default function AbsenceListes({group}) {
  console.log(group);
  
  const [search, setSearch] = useState('');
  const [isYearFilterDropDownActive, setIsYearFilterDropDownActive] = useState(false);
  const [year, setYear] = useState('All');
  const dropDownRef = useRef(null);

  const handleSearch = (value) => setSearch(value);

  const filteredData = group.filter((g) =>
    g.name.toLowerCase().startsWith(search.toLowerCase())
  );

  const handleChangeYear = (el) => {
    setYear(el);
    setIsYearFilterDropDownActive(false);
  };

  return (
    <Layout>

    <div className="max-w-6xl mx-auto px-8 py-6 space-y-4">
      <div className="flex items-center justify-between px-3 py-2 mb-4">
        <h1 className="text-xl text-gray-700 dark:text-gray-50 font-bold">Absence Listes</h1>
        <div className="flex items-center gap-4">
          <SearchBar searchTerm={search} handleSearch={handleSearch} />
          <div className="relative z-50 min-w-32" ref={dropDownRef}>
            <button
              onClick={() => setIsYearFilterDropDownActive(!isYearFilterDropDownActive)}
              className="flex items-center w-full justify-between gap-2 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {year}
              </div>
              <ChevronDown
                className={`w-4 h-4 duration-500 ${isYearFilterDropDownActive ? 'rotate-180' : ''}`}
              />
            </button>
            {isYearFilterDropDownActive && (
              <div className="absolute right-0 mt-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                {years
                  .filter((item) => item !== year)
                  .map((el, index) => (
                    <button
                      key={el}
                      onClick={() => handleChangeYear(el)}
                      className={`w-full px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        index === 0 ? 'rounded-t-lg' : ''
                      } ${index === years.length - 2 ? 'rounded-b-lg' : ''}`}
                    >
                      {el}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={'grid grid-cols-3 md:grid-cols-5 gap-4'}>
        {filteredData.map((group) => (
          <div
            key={group.id}
            className="group flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-200"
          >
            <Link
              href={`/absenceListes/${group.id}`}
              className="flex-1 text-gray-700 dark:text-gray-50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <span className="font-medium">{group.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
        </Layout>

  );
}
