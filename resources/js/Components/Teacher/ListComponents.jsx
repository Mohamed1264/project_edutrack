import { ArrowLeft, Users, Calendar } from 'lucide-react';
import AbsenceState from './AbsenceState';
import { Link } from '@inertiajs/react';

// Consistent grid template for all rows
const gridTemplateColumns = "minmax(50px, 0.5fr) minmax(120px, 1fr) 2fr";

/**
 * Header component for the attendance list
 * @param {string} groupLibel - Group name
 * @param {number} studentsCount - Number of students
 * @param {string} date - Formatted date string
 */
export function ListHeader({ groupLibel, studentsCount, date }) {
    return (
        <div className="mb-6">
            
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {groupLibel || 'Group'} Attendance
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Managing attendance for {studentsCount} {studentsCount === 1 ? 'student' : 'students'}
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {date}
                    </span>
                </div>
            </div>
        </div>
    )
}

/**
 * Table header component with consistent column widths
 */
export const TableListHeader = () => {
    return (
        <div 
            className="grid bg-gray-100 dark:bg-gray-700 px-4 py-3 gap-4 items-center rounded-lg mb-2 border border-gray-200 dark:border-gray-600"
            style={{ gridTemplateColumns }}
        >
            <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-200">ID</div>
            <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-200">STUDENT NAME</div>
            <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-200">ATTENDANCE STATUS</div>
        </div>
    )
}

/**
 * Table body component that displays student list and attendance controls
 * @param {Array} students - Array of student objects
 * @param {Array} absenceData - Current absence status data
 * @param {Function} onStatusChange - Handler for status changes
 * @param {boolean} isSubmitted - Whether form is submitted
 */
export const TableListBody = ({ 
    students, 
    absenceData, 
    onStatusChange, 
    isSubmitted ,
    absenceOld
}) => {  
    console.log(absenceOld);
     
    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
            {students.length > 0 ? (
                students.map((student) => {
                    const absenceold = absenceOld.find(item => item.student_id === student.id);
                    console.log(absenceold);
                    
                    const absence = absenceData.find(item => item.student_id === student.id);
                    console.log(absence);
                    
                    const currentStatus = absence?.type || 'Present';
                    const isJustified = absenceold ? absenceold.is_justified : true;
                    console.log(isJustified);
                                        
                    // 👇 Conditional row background class
                    const rowClass = isJustified
                        ? 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        : 'bg-red-50 dark:bg-red-900/30';

                    return (
                        <div 
                            key={student.id}
                            className={`grid px-4 py-3 gap-4 items-center transition-colors duration-150 ${rowClass}`}
                            style={{ gridTemplateColumns }}
                        >
                            <div className="text-sm text-center text-gray-600 dark:text-gray-300 font-medium">
                                {student.id}
                            </div>
                            <div className="text-sm text-center text-gray-800 dark:text-gray-100">
                                {student.name}
                            </div>
                            <div className="flex justify-center">
                                <AbsenceState
                                    studentId={student.id}
                                    currentStatus={currentStatus}
                                    onStatusChange={onStatusChange}
                                    disabled={isSubmitted}
                                />
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No students available in this group
                </div>
            )}
        </div>
    )
}
