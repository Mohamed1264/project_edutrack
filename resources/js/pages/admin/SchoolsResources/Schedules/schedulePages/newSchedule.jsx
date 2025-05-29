import  { useState, useEffect, useMemo } from 'react';
import { Pen,Trash2 } from 'lucide-react';
import { days,sessions } from '../../../../../Data/ScheduleData';


// Helper functions
const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

const calculateDuration = (startTime, endTime) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const durationMinutes = endMinutes - startMinutes;
  
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
};

const formatDay = (date) => {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getDay()];
};

const generateNewId = () => `temp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

// Process and merge adjacent sessions
const mergeAdjacentSessions = (sessions) => {
  // First, sort sessions by day and start time
  const sortedSessions = [...sessions].sort((a, b) => {
    if (a.day_of_week !== b.day_of_week) {
      return days.indexOf(a.day_of_week) - days.indexOf(b.day_of_week);
    }
    return timeToMinutes(a.start_time) - timeToMinutes(b.start_time);
  });

  const mergedSessions = [];
  let currentSession = null;

  sortedSessions.forEach(session => {
    if (!currentSession) {
      currentSession = { ...session };
      return;
    }

    // Check if this session is adjacent to the current one
    const sameDay = currentSession.day_of_week === session.day_of_week;
    const adjacent = currentSession.end_time === session.start_time;
    const sameGroup = currentSession.group_name === session.group_name;
    const sameType = currentSession.type === session.type;
    const sameRoom = currentSession.room_name === session.room_name;

    if (sameDay && adjacent && sameGroup && sameType && sameRoom) {
      // Merge this session with the current one
      currentSession.end_time = session.end_time;
    } else {
      // This session is not adjacent or has different properties
      mergedSessions.push(currentSession);
      currentSession = { ...session };
    }
  });

  // Don't forget to add the last session
  if (currentSession) {
    mergedSessions.push(currentSession);
  }

  return mergedSessions;
};

// Process multi-day events
const processEvents = (events) => {
  return events.map(event => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    
    // Calculate full days between dates (excluding partial days)
    const daysDiff = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));
    
    // Check if start and end times indicate full days
    const isStartFullDay = event.start_time === "00:00" || event.start_time === "";
    const isEndFullDay = event.end_time === "23:59" || event.end_time === "";
    
    // Case 1: Single full day event
    if (daysDiff === 0 && isStartFullDay && isEndFullDay) {
      return [{
        ...event,
        type: "full-day",
        renderType: "single-block",
        colSpan: sessions.length, // Span all time slots for the day
        rowSpan: 1
      }];
    }
    
    // Case 2: Multiple full days
    if (daysDiff >= 1 && isStartFullDay && isEndFullDay) {
      return [{
        ...event,
        type: "multi-day-full",
        renderType: "single-block",
        colSpan: sessions.length, // Span all time slots
        rowSpan: daysDiff + 1 // Total days including start and end
      }];
    }
    
    // Case 3: Event spans days but with partial days
    // This is the complex case that needs splitting
    const blocks = [];
    
    // First day (may be partial)
    blocks.push({
      ...event,
      type: "multi-day-partial",
      renderType: "start-block",
      day: formatDay(startDate), // Convert date to day name
      colSpan: isStartFullDay ? sessions.length : calculateColSpan(event.start_time, "23:59"),
      rowSpan: 1,
      start_time: event.start_time,
      end_time: "23:59"
    });
    
    // Full days in between (if any)
    if (daysDiff > 1) {
      // For each full day in between
      for (let i = 1; i < daysDiff; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        blocks.push({
          ...event,
          type: "multi-day-partial",
          renderType: "middle-block",
          day: formatDay(currentDate),
          colSpan: sessions.length, // Full day
          rowSpan: 1,
          start_time: "00:00",
          end_time: "23:59"
        });
      }
    }
    
    // Last day (may be partial)
    if (!isEndFullDay || daysDiff > 0) {
      const lastDayDate = new Date(startDate);
      lastDayDate.setDate(startDate.getDate() + daysDiff);
      
      blocks.push({
        ...event,
        type: "multi-day-partial",
        renderType: "end-block",
        day: formatDay(lastDayDate),
        colSpan: isEndFullDay ? sessions.length : calculateColSpan("00:00", event.end_time),
        rowSpan: 1,
        start_time: "00:00",
        end_time: event.end_time
      });
    }
    
    return blocks;
  }).flat(); // Flatten the array of arrays
};

const calculateColSpan = (startTime, endTime) => {
  // Calculate number of columns based on time slots
  const startIndex = sessions.findIndex(slot => 
    timeToMinutes(slot.start) >= timeToMinutes(startTime)
  );
  
  let endIndex = sessions.findIndex(slot => 
    timeToMinutes(slot.start) > timeToMinutes(endTime)
  );
  
  if (endIndex === -1) endIndex = sessions.length;
  
  return Math.max(1, endIndex - startIndex); // At least 1 column
};

const calculateIsMergedSession = (session) => {
  // Check if this session spans multiple standard slots
  const startIndex = sessions.findIndex(slot => slot.start === session.start_time);
  const endIndex = sessions.findIndex(slot => slot.end === session.end_time);
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    return true;
  }
  
  // Check non-standard time spans
  const sessionDuration = timeToMinutes(session.end_time) - timeToMinutes(session.start_time);
  const standardDuration = 150; // 2.5 hours in minutes
  
  return sessionDuration > standardDuration;
};

const splitMergedSession = (mergedSession) => {
  const splitSessions = [];
  var currentStart = mergedSession.start_time;
  
  while (currentStart !== mergedSession.end_time) {
    // Find the next standard slot boundary
    const slotIndex = sessions.findIndex(slot => slot.start === currentStart);
    
    if (slotIndex === -1) {
      // Handle custom time slots
      break;
    }
    
    const nextEnd = sessions[slotIndex].end;
    const isLastSegment = nextEnd === mergedSession.end_time;
    
    splitSessions.push({
      ...mergedSession,
      idSession: isLastSegment ? mergedSession.idSession : generateNewId(),
      start_time: currentStart,
      end_time: nextEnd
    });
    
    currentStart = nextEnd;
  }
  
  return splitSessions;
};

// Components
const FullSession = ({ name, room, status, duration }) => {
  return (
    <div className={`p-2 h-full rounded ${status === 'active' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}>
      <div className="font-semibold">{name}</div>
      <div className="text-xs">{room}</div>
      {duration && <div className="text-xs mt-1 italic">{duration}</div>}
    </div>
  );
};

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const getCellClassNames = (dayIndex, sessionIndex, matchingSessions, days, sessions) => {
  const isLastDay = dayIndex === days.length - 1;
  const isOddSession = sessionIndex === 1 || sessionIndex === 3;
  const isEvenSession = sessionIndex === 0 || sessionIndex === 2;
  const isLastSession = sessionIndex === sessions.length - 1;
  
  return `
    col-start-${sessionIndex + 2} row-start-${dayIndex + 2} 
    ${!matchingSessions?.idSession && 'hover:bg-purple-50 dark:hover:bg-purple-900/20'}
    ${isOddSession && 'mr-2'}  
    ${isLastDay && isOddSession && 'rounded-br-lg'}
    ${isLastDay && isEvenSession && 'rounded-bl-lg'}
    ${isLastDay && isLastSession && 'rounded-b-lg'}
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700    
    cursor-pointer min-h-16 relative p-1 duration-300 transition-all  
    hover:border-purple-500 dark:hover:border-purple-500
    hover:shadow-sm
  `;
};

const RenderSessionCell = ({day, dayIndex, session, sessionIndex, schedule, handleRowRightClick, handleEdit}) => {
    // Find if this cell should be the start of a multi-slot session
    const matchingSession = schedule.find(s => 
        s.day_of_week === day && session.start === s.start_time
    );
    
    // Calculate if this cell should be skipped (because it's covered by a multi-slot session)
    const isPartOfPreviousSession = schedule.some(s => 
        s.day_of_week === day && 
        s.start_time < session.start && 
        s.end_time > session.start
    );
    
    // Skip rendering if this cell is part of a previous multi-slot session
    if (isPartOfPreviousSession) {
        return null;
    }
    
    const sessionData = {
        idSession: new Date().getTime(),
        day_of_week: day,
        start_time: session.start,
        end_time: session.end, 
    };
    
    // Calculate span based on merged sessions
    const spanCount = matchingSession ? calculateColSpan(matchingSession.start_time, matchingSession.end_time) : 1;
    
    return (
        <div 
            key={`${dayIndex}-${sessionIndex}`} 
            className={getCellClassNames(dayIndex, sessionIndex, matchingSession, days, sessions)}
            style={{
                gridColumn: `span ${spanCount}`
            }}
            onContextMenu={(e) => handleRowRightClick(matchingSession?.idSession ? matchingSession : sessionData, e)}
        >
            {matchingSession?.idSession && (
                <div className="relative w-full h-full">
                    <FullSession 
                        name={matchingSession?.group_name} 
                        room={matchingSession?.type === 'Presentiel' ? matchingSession?.room_name : 'A distance'} 
                        status={matchingSession.status}
                        duration={calculateDuration(matchingSession.start_time, matchingSession.end_time)}
                    />
                    
                    <div className="absolute top-1 right-1 flex space-x-1">
                        <button 
                            className="p-1 bg-blue-100 rounded hover:bg-blue-200"
                            onClick={() => handleEdit(matchingSession)}
                            title="Edit session"
                        >
                            <EditIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const EditSessionModal = ({ session, onSave, onCancel, onSplit }) => {
    const [formData, setFormData] = useState({
        day_of_week: session.day_of_week,
        start_time: session.start_time,
        end_time: session.end_time,
        group_name: session.group_name,
        room_name: session.room_name,
        type: session.type || 'Presentiel',
        status: session.status || 'active'
    });
    
    const timeSlots = [
        { value: "08:30", label: "08:30" },
        { value: "11:00", label: "11:00" },
        { value: "13:30", label: "13:30" },
        { value: "16:00", label: "16:00" },
        { value: "18:30", label: "18:30" },
        { value: "21:30", label: "21:30" }
    ];
    
    const isMerged = calculateIsMergedSession(session);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...session,
            ...formData
        });
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4">Edit Session</h2>
                
                <form onSubmit={handleSubmit}>
                    {isMerged && (
                        <div className="p-3 bg-yellow-50 rounded mb-4">
                            <p className="text-sm">This is a merged session spanning multiple time slots.</p>
                            <button 
                                type="button" 
                                className="mt-2 text-sm text-blue-600"
                                onClick={() => onSplit(session)}
                            >
                                Split into individual sessions
                            </button>
                        </div>
                    )}
                
                    <div className="mb-4">
                        <label className="block mb-1">Day</label>
                        <select 
                            name="day_of_week" 
                            value={formData.day_of_week}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block mb-1">Start Time</label>
                        <select 
                            name="start_time" 
                            value={formData.start_time}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            {timeSlots.map(slot => (
                                <option key={slot.value} value={slot.value}>{slot.label}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block mb-1">End Time</label>
                        <select 
                            name="end_time" 
                            value={formData.end_time}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            {timeSlots
                                .filter(slot => timeToMinutes(slot.value) > timeToMinutes(formData.start_time))
                                .map(slot => (
                                    <option key={slot.value} value={slot.value}>{slot.label}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Group</label>
                        <input 
                            type="text"
                            name="group_name" 
                            value={formData.group_name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1">Type</label>
                        <select 
                            name="type" 
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Presentiel">Presentiel</option>
                            <option value="A distance">A distance</option>
                        </select>
                    </div>

                    {formData.type === 'Presentiel' && (
                        <div className="mb-4">
                            <label className="block mb-1">Room</label>
                            <input 
                                type="text"
                                name="room_name" 
                                value={formData.room_name || ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    )}
                    
                    <div className="flex justify-end space-x-2 mt-4">
                        <button 
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Event Rendering Component
const EventBlock = ({ event }) => {
    const getEventStyle = () => {
        switch (event.renderType) {
            case 'single-block':
                return 'bg-green-100 border-green-300';
            case 'start-block':
                return 'bg-blue-100 border-blue-300 border-b-dashed';
            case 'middle-block':
                return 'bg-blue-50 border-blue-300 border-dashed';
            case 'end-block':
                return 'bg-blue-100 border-blue-300 border-t-dashed';
            default:
                return 'bg-gray-100 border-gray-300';
        }
    };

    return (
        <div 
            className={`p-2 rounded border ${getEventStyle()} h-full`}
            style={{
                gridColumn: `span ${event.colSpan}`,
                gridRow: event.rowSpan > 1 ? `span ${event.rowSpan}` : undefined
            }}
        >
            <div className="font-semibold truncate">{event.title || 'Event'}</div>
            <div className="text-xs">
                {event.start_time !== '00:00' && event.start_time} 
                {event.end_time !== '23:59' && ` - ${event.end_time}`}
            </div>
            {event.description && (
                <div className="text-xs mt-1 truncate">{event.description}</div>
            )}
        </div>
    );
};

// Main Schedule Component
const ScheduleGrid = () => {
    const [rawSessions, setRawSessions] = useState([]);
    const [events, setEvents] = useState([]);
    const [editingSession, setEditingSession] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, data: null });
    
    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual API calls
                const sessionsData = await fetchSessionsFromAPI();
                const eventsData = await fetchEventsFromAPI();
                
                setRawSessions(sessionsData);
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        // Mock API for demo purposes
        const fetchSessionsFromAPI = async () => {
            // Simulating API response
            return [
                {
                    idSession: 1,
                    group_name: "DEV101",
                    day_of_week: "Monday",
                    start_time: "08:30",
                    end_time: "11:00",
                    type: "A distance",
                    room_name: null,
                    status: "active"
                },
                {
                    idSession: 2,
                    group_name: "GS201",
                    day_of_week: "Tuesday",
                    start_time: "11:00",
                    end_time: "13:30",
                    type: "Presentiel",
                    room_name: "Salle 4",
                    status: "active"
                },
                {
                    idSession: 3,
                    group_name: "DEVOWFS201",
                    day_of_week: "Wednesday",
                    start_time: "13:30",
                    end_time: "16:00",
                    type: "Presentiel",
                    room_name: "Info",
                    status: "active"
                },
                {
                    idSession: 4,
                    group_name: "GC103",
                    day_of_week: "Friday",
                    start_time: "16:00",
                    end_time: "18:30",
                    type: "A distance",
                    room_name: null,
                    status: "active"
                },
                {
                    idSession: 5,
                    group_name: "AI201",
                    day_of_week: "Saturday",
                    start_time: "19:30",
                    end_time: "21:30",
                    type: "A distance",
                    room_name: null,
                    status: "active"
                }
            ];
        };
        
        const fetchEventsFromAPI = async () => {
            // Simulating API response
            return [
                {
                    id: 1,
                    title: "Conference",
                    start_date: "2025-04-10",
                    end_date: "2025-04-10",
                    start_time: "00:00",
                    end_time: "23:59",
                    description: "Full day conference"
                },
                {
                    id: 2,
                    title: "Workshop",
                    start_date: "2025-04-11",
                    end_date: "2025-04-12",
                    start_time: "13:30",
                    end_time: "16:00",
                    description: "Two-day workshop"
                }
            ];
        };
        
        fetchData();
    }, []);
    
    // Process sessions and events when raw data changes
    const mergedSessions = useMemo(() => {
        return mergeAdjacentSessions(rawSessions);
    }, [rawSessions]);
    
    const processedEvents = useMemo(() => {
        return processEvents(events);
    }, [events]);
    
    // Event handlers
    const handleRowRightClick = (sessionData, e) => {
        e.preventDefault();
        
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            data: sessionData
        });
    };
    
    const handleEdit = (session) => {
        setEditingSession(session);
    };
    
    const handleSaveEdit = async (updatedSession) => {
        try {
            // In a real app, send to API
            // await apiUpdateSession(updatedSession);
            
            // Update local state
            setRawSessions(prev => prev.map(s => 
                s.idSession === updatedSession.idSession ? updatedSession : s
            ));
            
            setEditingSession(null);
        } catch (error) {
            console.error("Error updating session:", error);
        }
    };
    
    const handleSplitSession = async (mergedSession) => {
        const splitSessions = splitMergedSession(mergedSession);
        
        try {
            // In a real app, send to API
            // Delete the merged session (except the last segment which keeps the original ID)
            // Create new sessions for the split parts
            // await Promise.all(splits.map(createSession));
            
            // Update local state
            setRawSessions(prev => {
                // Remove the merged session
                const filtered = prev.filter(s => s.idSession !== mergedSession.idSession);
                // Add back all the split sessions
                return [...filtered, ...splitSessions];
            });
            
            setEditingSession(null);
        } catch (error) {
            console.error("Error splitting session:", error);
        }
    };
    
    const handleCloseContextMenu = () => {
        setContextMenu({ visible: false, x: 0, y: 0, data: null });
    };
    
    const createNewSession = async (sessionData) => {
        try {
            // In a real app, send to API
            // const response = await apiCreateSession(sessionData);
            // const newSession = response.data;
            
            // For demo, generate ID
            const newSession = {
                ...sessionData,
                idSession: Date.now()
            };
            
            // Update local state
            setRawSessions(prev => [...prev, newSession]);
            
            handleCloseContextMenu();
        } catch (error) {
            console.error("Error creating session:", error);
        }
    };
    
    const deleteSession = async (sessionId) => {
        try {
            // In a real app, send to API
            // await apiDeleteSession(sessionId);
            
            // Update local state
            setRawSessions(prev => prev.filter(s => s.idSession !== sessionId));
            
            handleCloseContextMenu();
        } catch (error) {
            console.error("Error deleting session:", error);
        }
    };
    
    // Effect to handle clicking outside of context menu
    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu.visible) {
                handleCloseContextMenu();
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [contextMenu]);
    
    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Schedule</h1>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-red-500 text-white rounded">
                        Clear Schedule
                    </button>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded">
                        Save Changes
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        Export PDF
                    </button>
                </div>
            </div>
            
            {/* Schedule Grid */}
            <div className="grid grid-cols-[auto,repeat(5,1fr)] grid-rows-[auto,repeat(6,1fr)] gap-1 border rounded-lg">
                {/* Header Row with Time Slots */}
                <div className="col-span-1 row-span-1 p-2 bg-purple-100 dark:bg-purple-900/20"></div>
                {sessions.map((session, index) => (
                    <div 
                        key={`header-${index}`} 
                        className="p-2 bg-purple-100 dark:bg-purple-900/20 text-center"
                    >
                        {session.start} - {session.end}
                    </div>
                ))}
                
                {/* Day Column */}
                {days.map((day, dayIndex) => (
                    <div key={`day-${dayIndex}`}>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/20">
                            {day}
                        </div>
                        
                        {/* Render session cells for this day */}
                        {sessions.map((session, sessionIndex) => (
                            <RenderSessionCell
                                key={`cell-${dayIndex}-${sessionIndex}`}
                                day={day}
                                dayIndex={dayIndex}
                                session={session}
                                sessionIndex={sessionIndex}
                                schedule={mergedSessions}
                                handleRowRightClick={handleRowRightClick}
                                handleEdit={handleEdit}
                            />
                        ))}
                    </div>
                ))}
            </div>
            
            {/* Events Section */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Events</h2>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600">Manage upcoming events</p>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-purple-500 text-white rounded">
                            Add Event
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded">
                            Remove All Events
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-3 p-6'>
            
                
                   <div className='p-2 rounded-lg flex items-center justify-between gap-3 min-w-20 border text-gray-700 dark:text-gray-50 bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:hover:border-purple-700 hover:border-purple-500 '>
                        <div>
                            <span className=' font-medium mr-3'>fullName</span>
                            <span className=" text-sm font-medium text-gray-400 dark:text-gray-500"> 11/03/2025 - 13/04/2025</span>

                        </div>
                       
                        <div className="flex items-center gap-2">
                            <button
                                className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50 
                                    text-purple-600 dark:text-purple-400 
                                    hover:bg-purple-200 dark:hover:bg-purple-900"
                            >
                                <Pen size={18} />
                            </button>
                            
                            <button
                                className="p-2 rounded-full bg-red-100 dark:bg-red-900/50 
                                    text-red-600 dark:text-red-400 
                                    hover:bg-red-200 dark:hover:bg-red-900"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
             
                   </div>
    
                </div>
                </div>
        </div>
)
}
export default ScheduleGrid