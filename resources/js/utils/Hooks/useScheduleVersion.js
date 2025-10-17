import { Eclipse } from "lucide-react";
import { useState } from "react";

const useScheduleVersions = (initialSchedule) => {
  const [activeScheduleVersion, setActiveScheduleVersion] = useState(1);
  const [scheduleVersions, setScheduleVersions] = useState(
    groupSchedule(initialSchedule)
  );

  // تقسيم الـ schedule حسب end_date
  function groupSchedule(data) {
    if (!data || data.length === 0) return [{ id: 0, schedule: [] }];


    let versions = [{ id: 0, schedule: [] }]; // نسخة id=0 خاصة باللي عندهم end_date=null
    let currentVersion = [];
    let currentEndDate = null;
    let currentstartDate=null;
    let DateEnd=null
    data.forEach((row, index) => {
      console.log(row.raw);   
      const rowEndDate = row.raw.version_end_date
  ? new Date(row.raw.version_end_date)
  : null;


const DateEnd = currentEndDate
  ? currentEndDate.toISOString().split('T')[0]
  : new Date().toISOString().split('T')[0];

console.log(DateEnd<=rowEndDate);

       
      const rowStartDate = new Date(row.raw.version_start_date);
      
      if (rowStartDate<currentstartDate || !currentstartDate) {
        
        currentstartDate=row.raw.version_start_date
      }
      console.log( rowStartDate.getTime() );
      console.log(currentEndDate );
      
      
        
      // أول مرة نحدد currentEndDate
      if (currentEndDate === null  ) {
        currentEndDate = rowEndDate;
        currentVersion.push(row);
      }
      else if (
        rowEndDate <currentEndDate || // نهاية أصغر → نسخة جديدة
        rowStartDate > currentEndDate // البداية أصغر من نهاية النسخة الحالية → نسخة جديدة
      ) {

        console.log(rowEndDate);
        console.log(currentEndDate.getTime());
        
        
        // close current version
        versions.push({
          datation:`${currentstartDate}/${DateEnd}`, 
          id: versions.length, // id جديد
          schedule: currentVersion,
        });

        // start new version
        currentVersion = [row];
        currentEndDate = rowEndDate;
      } else {
        // نفس النسخة
        currentVersion.push(row);
      }
    });

    // زيد آخر نسخة
    if (currentVersion.length > 0) {
      versions.push({
        datation:`${currentstartDate}/${DateEnd}`, 
        id: versions.length, // id جديد
        schedule: currentVersion,
      }); 
    }
    const length=versions.length
  const  VersionData=  versions.map((e,i)=>(
   i!=0&& {id:length-i , schedule: e.schedule ,datation:e.datation})
  )
  console.log(VersionData);
  
    return VersionData;
  }

  const addVersion = (schedule) => {
    const newVersionId =
      scheduleVersions.length > 0
        ? Math.max(...scheduleVersions.map((v) => v.id)) + 1
        : 1;

    const newScheduleVersion = {
      id: newVersionId,
      schedule: schedule,
    };

    setScheduleVersions((prev) => [...prev, newScheduleVersion]);
    setActiveScheduleVersion(newVersionId);
  };

  const resetScheduleVersions = () => {
    setScheduleVersions(groupSchedule(initialSchedule));
    setActiveScheduleVersion(1);
  };

  const goToPreviousVersion = () => {
    if (activeScheduleVersion <= 1) return getCurrentSchedule();

    const previousVersion = activeScheduleVersion - 1;
    setActiveScheduleVersion(previousVersion);
    return (
      scheduleVersions.find((v) => v.id === previousVersion)?.schedule || []
    );
  };

  const goToNextVersion = () => {
    if (activeScheduleVersion+1 >= scheduleVersions.length){
      setActiveScheduleVersion(1)
      return getCurrentSchedule();}
    
    const nextVersion = activeScheduleVersion + 1;
    setActiveScheduleVersion(nextVersion);
    console.log(nextVersion);

    return (
      scheduleVersions.find((v) => v.id === nextVersion)|| []
    );
  };

  const getCurrentSchedule = () => {
    return (
      scheduleVersions.find((v) => v.id === activeScheduleVersion)||[]
    );
  };
      
  return {
    activeScheduleVersion,
    scheduleVersions,
    addVersion,
    goToPreviousVersion,
    goToNextVersion,
    getCurrentSchedule,
    resetScheduleVersions,
  };
};

export default useScheduleVersions;
