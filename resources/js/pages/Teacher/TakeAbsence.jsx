import { useState } from 'react';
import { router } from '@inertiajs/react';
import Layout from '../../layouts/Layout';
import {
  ListHeader,
  TableListBody,
  TableListHeader
} from '../../Components/Teacher/ListComponents';

export default function TakeAbsence({ initialGroup ,schedule , absence}) {
  const groupData = initialGroup || null;
  console.log(absence);
  
  const studentsData = groupData?.students || [];
  const { id: groupId } = groupData || {};
  console.log(schedule);
  
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const generateInitialAbsenceData = () =>
    studentsData.map((student) => ({
      student_id: student.id,
      type: 'Present',
      isJustified: false,
    }));

  const [absenceData, setAbsenceData] = useState(generateInitialAbsenceData());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleReset = () => {
    setAbsenceData(generateInitialAbsenceData());
    setIsSubmitted(false);
    setSuccessMessage('');
  };

  const handleStatusChange = (studentId, newStatus) => {
    setAbsenceData((prev) =>
      prev.map((item) =>
        item.student_id === studentId ? { ...item, type: newStatus } : item
      )
    );
  };
console.log(absenceData);

  const submitAbsence = (e) => {
    e.preventDefault();

    router.post(
      '/absences',
      {
        group_id: groupId,
        absences: absenceData,
        schedule_data: schedule,
        formattedDate:formattedDate
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          setSuccessMessage('Attendance submitted successfully!');
        },
        onError: (errors) => {
          console.error('Error submitting attendance:', errors);
          alert('Failed to record attendance. Please try again.');
        },
      }
    );
  };

  return (
    <Layout>
      <div className="mt-4 text-gray-700 dark:text-gray-50 max-w-5xl mx-auto px-7 pr-5">
        <ListHeader
          groupLibel={groupData?.name || 'Unknown Group'}
          studentsCount={studentsData.length}
          date={formattedDate}
        />

        {successMessage && (
          <div className="mb-4 px-4 py-3 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        )}

        {studentsData.length > 0 ? (
          <form
            onSubmit={submitAbsence}
            className="p-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          >
            <TableListHeader />

            <TableListBody
              students={studentsData}
              absenceData={absenceData}
              absenceOld={absence}
              onStatusChange={handleStatusChange}
              isSubmitted={isSubmitted}
            />

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="text-gray-50 bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 max-w-40 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitted}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitted}
                className="text-gray-50 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitted ? 'Submitted' : 'Submit Attendance'}
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
