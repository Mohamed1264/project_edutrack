import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function Table ({tableConfig,data,filteredData}){

    const {columns,actions,selectable} = tableConfig
   
 
    
    const gridTemplateColumns = [
        ...(selectable ? ['48px'] : []),
        ...columns.map(col => col.width || '1fr'),
        ...(actions ? ['28px'] : [])
      ].join(' ');
    

    
    return (
       
        <div className='p-2'>
            <TableHeader 
                gridTemplateColumns={gridTemplateColumns}
                tableConfig={tableConfig}
                data={data}
               
            />
            <TableBody 
                gridTemplateColumns={gridTemplateColumns}
                filteredData={filteredData}
              
                tableConfig={tableConfig}
            />
       </div>
    )
}




