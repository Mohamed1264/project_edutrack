import { useState } from "react";
import { list } from "../../Data/Lists";
import { listeAbsenceData } from "../../Data/ListeAbsenceData";
import { ListHeader } from "../../Components/Teacher/ListComponents";
import { sessions, days } from "../../Data/ScheduleData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "../../layouts/Layout";

export default function List({ idGroup,absence, weekId,group,ids,sessions, from,  studentIDS, student, days, to}) {
   const day=days.map(d=>d.day_name)
   
  const [selectedDay, setSelectedDay] = useState(day[0]);
  const newSessions = sessions
  .filter(session => session.start_time !== "19:00:00")
  .map(s => ({id:s.id, start: s.start_time, end: s.end_time }));
  const baseDate = new Date(from);
  const offset = day.indexOf(selectedDay); // e.g. Monday = 0
  baseDate.setDate(baseDate.getDate() + offset);
  
  const targetDate = baseDate.toISOString().slice(0, 10);
console.log(targetDate);
  
  const stagiairesList=student.map(s=>s.full_name)
  
  const data = [
    {
      idSession: 1,
      teacher_name: "John Doe",
      start_time: "08:30",
      end_time: "11:00",
      day_of_week: "Saturday",
      type: "Absent",
      student: "Ayoub Fikry",
    },
    {
      idSession: 2,
      teacher_name: "John Doe",
      start_time: "08:30",
      end_time: "11:00",
      day_of_week: "Monday",
      type: "Present",
      student: "Ayoub Fikry",
    },
    {
      idSession: 3,
      teacher_name: "John Doe",
      start_time: "11:00",
      end_time: "13:30",
      day_of_week: "Monday",
      type: "Absent",
      student: "Ayoub Fikry",
    },
    {
      idSession: 4,
      teacher_name: "John Doe",
      start_time: "13:30",
      end_time: "16:00",
      day_of_week: "Monday",
      type: "Late",
      student: "Ayoub Fikry",
    },
    {
      idSession: 5,
      teacher_name: "John Doe",
      start_time: "16:00",
      end_time: "18:30",
      day_of_week: "Thursday",
      type: "Absent",
      student: "Ayoub Fikry",
    },
  ];


  const weekData = listeAbsenceData.find((w) => w.id === Number(weekId));

  const fromDate = new Date(weekData?.from);
  const toDate = new Date(weekData?.to);

  const fromFormattedDate = fromDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toFormattedDate = toDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filtredDataBySelectedDay = data.filter((d) => d.day_of_week === selectedDay);

  const handleNextDay = () => {
    const dayIndex = day.indexOf(selectedDay);
    const newDay = dayIndex === day.length - 1 ? day[0] : day[dayIndex + 1];
    setSelectedDay(newDay);
  };

  const handlePreviousDay = () => {
    const dayIndex = day.indexOf(selectedDay);
    const newDay = dayIndex === 0 ? day[days.length - 1] : day[dayIndex - 1];
    setSelectedDay(newDay);
  };

  return (
    <Layout>

    <div className="max-w-6xl mx-auto px-8 py-6 space-y-4">
      <ListHeader groupLibel={group?.name} studentsCount={list.length} date={`${from} - ${to}`} />

      <div>
        <div className="grid grid-cols-[100px_repeat(1fr)] grid-rows-5 gap-2 ">
          <div className="row-span-2 bg-white dark:bg-gray-800  border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center text-lg font-semibold">
            <span className="block">Full Name</span>
          </div>

          {/* students list */}
          <div className="row-span-3 col-start-1 row-start-3 bg-white dark:bg-gray-800 px-3 rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="grid grid-cols-1 divide-y divide-gray-300 dark:divide-gray-700 space-y-2">
              {stagiairesList.map((stgr, idx) => (
                <span key={idx} className="block font-medium uppercase text-center py-2">
                  {stgr}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-4 row-span-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2">
            <div className="h-10 flex items-center justify-between gap-4 mb-2">
              <button
                onClick={handlePreviousDay}
                className="p-2 text-gray-300 dark:text-gray-500 hover:text-purple-700 dark:hover:text-purple-600 rounded-lg flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-center text-lg font-semibold">{selectedDay}</span>
              <button
                onClick={handleNextDay}
                className="p-2 text-gray-300 dark:text-gray-500 hover:text-purple-700 dark:hover:text-purple-600 rounded-lg flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2 justify-between">
              {newSessions.map((session, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-4 px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-950/50 border border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-50 flex-1 font-semibold"
                >
                  <span>{session.start}</span>
                  <span>-</span>
                  <span>{session.end}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-4 row-span-3 col-start-2 row-start-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 divide-y divide-gray-300 dark:divide-gray-700">
            {stagiairesList.map((stgr, idx) => (
              <div key={idx} className="flex items-center gap-2 justify-between py-2">
                {newSessions.map((session, sidx) => (
                  <RenderAbsence
                    key={`${stgr}-${session.start}`}
                    session={session}
                    data={absence}
                    from={targetDate}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>

  );
}

const RenderAbsence = ({ session, data , from}) => {
  const style = {
    Present: "bg-green-100 border-green-700 text-green-700 dark:bg-emerald-400 dark:text-emerald-50 dark:border-emerald-700",
    Absent: "bg-red-100 border-red-700 text-red-700 dark:bg-red-500 dark:text-red-50 dark:border-red-700",
    Late: "bg-orange-100 border-orange-700 text-orange-700 dark:bg-orange-400 dark:text-orange-50 dark:border-orange-700",
  };
  
  const matchedRecord = data.find(
    (d) =>
      d.session_id === session.id &&
      new Date(d.created_at).toISOString().slice(0, 10) == from
  );
    console.log(matchedRecord);
  
  return matchedRecord?.session_id ? (
    <div
      className={`flex items-center justify-center gap-4 px-2 py-1 rounded-md flex-1 font-semibold ${style[matchedRecord.type]}`}
    >
      <span>{matchedRecord.type}</span>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-4 px-2 py-1 rounded-md flex-1 font-semibold bg-gray-200 dark:bg-gray-700 min-h-8"></div>
  );
};
