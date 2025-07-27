import { Check, X, Clock } from 'lucide-react';
import PropTypes from 'prop-types';

const statusConfig = {
  Present: {
    icon: Check,
    color: 'green',
    label: 'Present'
  },
  Late: {
    icon: Clock,
    color: 'orange',
    label: 'Late'
  },
  Absent: {
    icon: X,
    color: 'red',
    label: 'Absent'
  }
};

const AbsenceState = ({ 
  studentId, 
  currentStatus = 'Present', 
  onStatusChange, 
  disabled = false 
}) => {
  const handleChange = (status) => {
    if (!disabled) {
      onStatusChange(studentId, status);
    }
  };
  

  return (
    <div className="flex justify-center items-center gap-6">
      {Object.entries(statusConfig).map(([status, { icon: Icon, color, label }]) => {
        const isActive = currentStatus === status;
        const baseClasses = "flex items-center gap-2 cursor-pointer transition-colors duration-200";
        const activeClasses = `text-${color}-500 dark:text-${color}-400`;
        const inactiveClasses = "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300";
        
        return (
          <div 
            key={`${status}-${studentId}`}
            className={baseClasses}
            onClick={() => handleChange(status)}
          >
            <input
              type="radio"
              id={`${status}-${studentId}`}
              className="sr-only"
              checked={isActive}
              onChange={() => handleChange(status)}
              disabled={disabled}
            />
            <div className={`flex items-center gap-2 ${isActive ? activeClasses : inactiveClasses}`}>
              <Icon size={20} className="shrink-0" />
              <span className="text-sm font-medium">
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

AbsenceState.propTypes = {
  studentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currentStatus: PropTypes.oneOf(['Present', 'Late', 'Absent']),
  onStatusChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default AbsenceState;