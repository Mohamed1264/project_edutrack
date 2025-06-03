import {  useState } from 'react';

import { stageirs, Groups  } from '../../Data/TeacherSideData';
import {ListHeader ,TableListBody, TableListHeader} from '../../Components/Teacher/ListComponents';


const Listabsence = () => {
  const { absenceId } = useParams();


  // Filter stagiaires by group
  const filteredStagiaires = stageirs.filter(
    (stagiaire) => stagiaire.idg.toString() === absenceId
  );

  // Initialize absenceData as an array
  const initialAbsenceData = () => {
    return filteredStagiaires.map((stagiaire) => ({
      cef: stagiaire.Cef,
      type: 'Present',
      seance: '8:30 - 11:00',
      isJustified: false,
    }));
  };

  const [absenceData, setAbsenceData] = useState(initialAbsenceData());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const group = Groups.find((group) => group.idg.toString() === absenceId);

  // Handle radio button change
  const handleRadioChange = (cef, type) => {
    setAbsenceData((prev) =>
      prev.map((item) =>
        item.cef === cef ? { ...item, type } : item
      )
    );
  };
  // Submit absence data
  const submitAbsence = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    alert('Attendance recorded successfully!');

  };

  // Reset absence data
  const handleReset = () => {
    setAbsenceData(initialAbsenceData());
    setIsSubmitted(false);
  };

  return (
    <div className="mt-4 text-gray-700 dark:text-gray-50 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <ListHeader groupLibel={group.name} studentsCount={filteredStagiaires.length} date={'TuesDay, March 26, 2025'} />

      {filteredStagiaires && filteredStagiaires.length > 0 ? (
        <div className="table-responsive px-8">
          <form onSubmit={submitAbsence} className="p-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            {/* Header */}
            <TableListHeader />

            {/* Body */}
            <TableListBody 
              filteredStagiaires={filteredStagiaires} 
              absenceData={absenceData} 
              handleRadioChange={handleRadioChange} 
              isSubmitted={isSubmitted} 
              
            />

            <div className="mt-4 flex items-center justify-end gap-3">
            <button
                className="text-gray-50 bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  max-w-56 disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={handleReset}
              >
                Cancel this Absence
              </button>
              <button
                type="submit"
                className={`px-6 py-2 text-white rounded-lg focus:outline-none bg-green-700 hover:bg-green-900 ${
                  isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitted}
              >
                Update
              </button>

            </div>
          </form>
        </div>
      ) : (
        <p className="text-center">No stagiaires found for this group.</p>
      )}
    </div>
  );
};

export default Listabsence;