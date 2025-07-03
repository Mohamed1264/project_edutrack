import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '../../layouts/Layout';
import { ListHeader, TableListBody, TableListHeader } from '../../Components/Teacher/ListComponents';

export default function TakeAbsence({ initialGroup }) {
  // Use initial group from props
  const groupData = initialGroup || null;
console.log(groupData);

  // Safely extract students from the group
  const studentsData = groupData?.students || [];
console.log(studentsData);

  // Format current date
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate initial absence data
  const initialAbsenceData = () =>
    studentsData.map((student) => ({
      student_id: student.id,
      type: 'Present',
      isJustified: false,
    }));

  const [absenceData, setAbsenceData] = useState(initialAbsenceData());
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset form
  const handleReset = () => {
    setAbsenceData(initialAbsenceData());
    setIsSubmitted(false);
  };

  // Handle radio button change
  const handleRadioChange = (student_id, type) => {
    setAbsenceData((prev) =>
      prev.map((item) =>
        item.student_id === student_id ? { ...item, type } : item
      )
    );
  };

  // Submit form (you can integrate Inertia.post or axios here)
  const submitAbsence = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Replace with actual API call
    console.log("Submitted Absences:", absenceData);
    alert('Attendance recorded successfully!');
  };
console.log(absenceData);

  return (
    <Layout>
      <div className="mt-4 text-gray-700 dark:text-gray-50 max-w-5xl mx-auto px-7 pr-5">
        {/* Header */}
        <ListHeader
          groupLibel={groupData?.name || 'Unknown Group'}
          studentsCount={studentsData.length}
          date={formattedDate}
        />

        {/* Attendance Form */}
        {studentsData.length > 0 ? (
          <form
            onSubmit={submitAbsence}
            className="p-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          >
            <TableListHeader />

            <TableListBody
              filteredStagiaires={studentsData}
              absenceData={absenceData}
              handleRadioChange={handleRadioChange}
              isSubmitted={isSubmitted}
            />

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="text-gray-50 bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitted}
                className="text-gray-50 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Attendance
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
            No students found for this group.
          </p>
        )}
      </div>
    </Layout>
  );
}
