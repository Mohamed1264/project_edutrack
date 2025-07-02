import { usePage, router } from "@inertiajs/react";
import { useState } from "react";

import SelectWeek from "@/Components/form/SelectWeek";
import Table from "@/Components/table/Table";
import { ModalProvider } from "@/utils/Context/ModalContext";
import { TableProvider } from "@/utils/Context/TableContext";
import Layout from "../../layouts/Layout";

import {
  getActiveDay,
  getActiveWeek,
  getWeekDates,
} from "@/utils/DateFunctions";

export default function Justification({ justif,reasons }) {
  const { props } = usePage();
  const weeks = props.weeks || [];
 console.log(reasons);
 
  const initialActiveWeek = getActiveWeek(weeks) || weeks[0];
  const activeDay = getActiveDay();

  const [selectedWeek, setSelectedWeek] = useState(initialActiveWeek);
  const [selectedDay, setSelectedDay] = useState(activeDay);

  const [showModal, setShowModal] = useState(false);
  const [selectedAbsence, setSelectedAbsence] = useState(null);
  const [justificationReason, setJustificationReason] = useState("");

  const handleSelectWeek = (week) => {
    setSelectedWeek(week);
    setSelectedDay(week?.week === initialActiveWeek?.week ? activeDay : false);
  };

  const handleConfirmJustification = () => {
    if (!selectedAbsence) return;

    router.post(
      "/absences/justify",
      {
        id: selectedAbsence.idAbsence,
        reason: justificationReason,
      },
      {
        onSuccess: () => {
          setShowModal(false);
          setJustificationReason("");
          setSelectedAbsence(null);
        },
      }
    );
  };

  const daysOfWeek = selectedWeek ? getWeekDates(selectedWeek.from) : [];

  // Add a custom "Justify" button inside each row
 

  const config = {
    name: "teacher",
    actions: false,
    selectable: true,
    columns: [
      { field: "fullName", header: "Full Name" },
      { field: "group", header: "Group Name" },
      { field: "typeAbsence", header: "Type Absence" },
      { field: "totalAbsence", header: "Total Absence" },
      { field: "totalLate", header: "Total Late" },
      { field: "successiveDates", header: "Successive Date", width: "2fr" },
    ],
    searchBy: ["fullName"],
    filterBy: ["group", "typeAbsence", "totalAbsence", "totalLate"],
    links: false,
    modals: false,
    reasons:reasons,
    primaryKey: "idAbsence",
  };

  return (
    <Layout>
      
      <div className="max-w-6xl mx-auto px-8 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Justification</h1>
          {weeks.length > 0 && (
            <SelectWeek
              weeks={weeks}
              handleSelectWeek={handleSelectWeek}
              activeWeek={selectedWeek}
            />
          )}
        </div>
        
        <button
        onClick={() => {
          setSelectedAbsence(item);
          setShowModal(true);
        }}
        className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition text-sm"
      >
        Justify
      </button>

        {/* Week Days */}
        {daysOfWeek.length > 0 && (
          <div className="grid grid-cols-6 gap-4">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                onClick={() => setSelectedDay(day.day)}
                className={`px-3 py-2 border rounded-lg cursor-pointer transition
                  ${
                    selectedDay === day.day
                      ? "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-500 dark:bg-purple-950/50 dark:text-purple-50 dark:border-purple-700"
                      : "bg-white hover:bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  }`}
              >
                <span className="flex items-center justify-between">
                  <h1 className="text-sm font-medium">{day.day}</h1>
                  {day.day === activeDay && (
                    <span className="text-xs text-purple-500">Today</span>
                  )}
                </span>
                <p
                  className={`text-sm ${
                    selectedDay === day.day
                      ? "text-purple-700"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {day.date}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Absence Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-50 dark:border-gray-700 rounded-lg">
          <TableProvider>
            <ModalProvider>
              <Table
                tableConfig={config}
                data={justif}
                filteredData={justif}
              />
            </ModalProvider>
          </TableProvider>
        </div>
      </div>

      {/* Modal */}
      
    </Layout>
  );
}
