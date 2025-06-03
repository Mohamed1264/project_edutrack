import { ArrowLeft, Users, Calendar } from 'lucide-react';
import AbsenceState from './AbsenceState';
const gridTemplateColumns = "50px 120px 1fr";
export  function ListHeader({groupLibel , studentsCount, date}) {
  
    return (
        <div className=" mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {groupLibel || 'Unknown Group'} List
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update attendance for {studentsCount} students
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {date}
            </span>
          </div>
        </div>
      </div>
    )
}

export const TableListHeader = () => {
    return (
        <div className="grid bg-gray-100 dark:bg-gray-700 px-4 py-2 gap-4 items-center rounded-lg mb-2" 
        style={{ gridTemplateColumns }}>
            <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-200">ID</div>
            <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-200">FULL NAME</div>
            <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-200">ATTENDANCE</div>
        </div>
    )
}

export const TableListBody = ({filteredStagiaires,absenceData,handleRadioChange,isSubmitted}) => {   
    return (
        <div className="divide-y divide-gray-300 dark:divide-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
        {filteredStagiaires.map((s, index) => {
          const absenceEntry = absenceData.find((item) => item.cef === s.Cef);
          return (
            <div 
              key={s.id}
              className="grid px-4 py-2 gap-4 items-center hover:bg-gray-100 dark:hover:bg-gray-700"
              style={{ gridTemplateColumns }}
            >
              <div className="text-sm text-center">{index + 1}</div>
              <div className="text-sm text-center">{s.fullName}</div>
              <div className="text-sm text-center">
                <AbsenceState
                  cef={s.Cef}
                  rowData={s}
                  handleRadioChange={handleRadioChange}
                  absenceEntry={absenceEntry}
                  disabled={isSubmitted}
                />
              </div>
            </div>
          );
        })}
      </div>
    )
}

