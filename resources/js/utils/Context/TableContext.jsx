import { useContext,useState,createContext } from "react";
const TableContext = createContext();
export function TableProvider ({children}){
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters,setShowFilters] = useState(false);
    const [selectedRows,setSelectedRows] = useState([]);
    const [chooseColumns,setChooseColumns] = useState(false);
    const [activeColumns,setActiveColumns] = useState([]);
    const [activeFilters,setActiveFilters] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort,setSort] = useState({
        field : '',
        order : null
    })

    const handleSearch = (value) =>setSearchQuery(value)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    
      // Handle page size change
      const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1); // Reset to first page when changing page size
      };
      const handleSort = (field) =>{
        if(sort.field === field){
            const newOrder = sort.order === 'asc' ? 'desc' : null
            const newField = newOrder === 'desc' ? field : ''
            setSort({field : newField,order : newOrder})
        }else{
            setSort({field,order : 'asc'})
        }
      }
      
    return <TableContext.Provider value={{
        searchQuery,
        setSearchQuery,
        showFilters,
        setShowFilters,
        activeFilters,
        setActiveFilters,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        handleSearch,
        handlePageChange,
        handlePageSizeChange,
        chooseColumns,
        setChooseColumns,
        activeColumns,
        setActiveColumns,
        selectedRows,
        setSelectedRows,
        sort,
        handleSort
        }}>
        {children}
    </TableContext.Provider>

}

export function useTableContext (){
    return useContext(TableContext);
}