import { SelectInput } from "./Select"
export default function TimeFilter ({selected,setNewTimeRange}){
    const options = [
        {value:'All Time',option : 'De tous les temps'},
        {value:'Today',option : 'Aujourd\'hui'},
        {value:'Yesterday',option : 'Hier'},
        {value:'Last Week',option : 'La semaine dernière'},
        {value:'Last Month',option : 'Le mois dernier'},
    ]

    const handleChange = (name,value)=>{
        setNewTimeRange(value);
    }
 
    return (
        <div className="">
            <SelectInput 
                placeholder={'select Time period'} 
                handleChange={handleChange} 
                value={selected} 
                items={options} 
                labelKey = {'option'}
                valueKey = {'value'}
                name={'value'}
            />
        </div>
    )
}