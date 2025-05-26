import { Link } from 'react-router-dom'
import {users,groups} from '../../../../Data/Users'
import SearchBar from '../../../../Components/Common/SearchBar'
import { useState } from 'react'
import { Filter } from 'lucide-react'
import SchoolResourcesLayout from '../../../../layouts/SchoolResourcesLayout'
export default function Progress () { 
    const [search, setSearch] = useState('')
    const [filterBy, setFilterBy] = useState('Teachers')
    
    const handleSearch = (value) => setSearch(value)
    const teachers =  users.filter(user => user.role === 'teacher')
    const filteredData = filterBy === 'Teachers' ? teachers.filter(teacher => teacher.fullName.toLowerCase().startsWith(search.toLowerCase())) : groups.filter(group => group.libel.toLowerCase().startsWith(search.toLowerCase()))
    

     const handleFilter = ()=> filterBy === 'Teachers' ? setFilterBy('Groups') : setFilterBy('Teachers')

   

    return (
        <SchoolResourcesLayout>
         <div className='max-w-6xl mx-auto'>
            <div className='flex items-center justify-between px-3 py-2 mb-4'>
                <h1 className='text-xl text-gray-700 dark:text-gray-50 font-bold'>Track Progress</h1>
                <div className='flex items-center gap-4'>
                   
                    <SearchBar searchTerm={search} handleSearch={handleSearch} />
                    <button 
                        onClick={handleFilter}
                        className=' flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 
                        hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
                    >
                        <Filter className='w-4 h-4' />
                        {filterBy}
                    </button>
                </div>
            </div>

            <div className={' grid grid-cols-3 md:grid-cols-5 gap-4'}>
                {
                   filteredData.map(data => (
                    <div
                        key={data.matricule || data.idGroup}
                        className='group flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 
                            border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 
                            dark:hover:border-purple-500 transition-all duration-200'
                    >
                        <Link
                            to={ filterBy === 'Teachers' ? `/schoolResources/progress/teacher/${data.matricule}` : `/schoolResources/progress/group/${data.idGroup}`}
                            className='flex-1 text-gray-700 dark:text-gray-50 hover:text-purple-600 
                                dark:hover:text-purple-400 transition-colors'
                        >
                            <span className="font-medium">{data?.fullName || data?.libel}</span>
                        </Link>
                      
                    </div>
                ))
                
                }
            </div>
        </div>

        </SchoolResourcesLayout>
       
    )
}