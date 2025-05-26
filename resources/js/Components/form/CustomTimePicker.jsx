import { useState, useEffect, useRef } from 'react'
import { Clock } from 'lucide-react'

const CustomTimePicker = ({ value, onChange, className = '', placeholder,name }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedHour, setSelectedHour] = useState('00')
    const [selectedMinute, setSelectedMinute] = useState('00')
    const pickerRef = useRef(null)

    // Generate hours (00-23)
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    // Generate minutes (00-59)
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

    useEffect(() => {
        if (value) {
            const [hours, minutes] = value.split(':')
            setSelectedHour(hours)
            setSelectedMinute(minutes)
        }
    }, [value])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleHourChange = (hour) => {
        setSelectedHour(hour)
        onChange(name,`${hour}:${selectedMinute}`)
    }

    const handleMinuteChange = (minute) => {
        setSelectedMinute(minute)
        onChange(name,`${selectedHour}:${minute}`)
    }

    const handleInputChange = (e) => {
        const newValue = e.target.value
        if (newValue.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
            const [hours, minutes] = newValue.split(':')
            setSelectedHour(hours)
            setSelectedMinute(minutes)
            onChange(name,newValue)
        }
    }

    const formatDisplayValue = () => {
        if (!value) return placeholder
        return value
    }

    return (
        <div 
            className="relative cursor-pointer" 
            ref={pickerRef}
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen && (
                <div className="absolute bottom-full left-0 mb-1 z-10 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                    <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                        {/* Hours */}
                        <div className="max-h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {hours.map((hour) => (
                                <div
                                    key={hour}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleHourChange(hour)
                                    }}
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                        selectedHour === hour
                                            ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>

                        {/* Minutes */}
                        <div className="max-h-48 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {minutes.map((minute) => (
                                <div
                                    key={minute}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleMinuteChange(minute)
                                    }}
                                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                        selectedMinute === minute
                                            ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {minute}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className={`flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}>
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <input
                    type="text"
                    value={formatDisplayValue()}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none focus:outline-none dark:text-white cursor-pointer"
                    placeholder={placeholder}
                    readOnly
                />
            </div>
        </div>
    )
}

export default CustomTimePicker 