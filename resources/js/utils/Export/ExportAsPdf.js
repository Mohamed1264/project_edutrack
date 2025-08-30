

import jsPDF from "jspdf";

import { toPng } from "html-to-image";

export const exportToPDF = async (targetId,owner,name,date,mass) => {
  console.log(mass);

  const named=owner[name] ? owner[name]:owner.user[name]
  const massHorraire=mass.length*2.5
    console.log(massHorraire);
  
  const node = document.getElementById(targetId);
  if (!node) {
    alert("⚠️ Table not found!");
    return;
  }

  try {
    // تحويل الجدول لصورة
    const dataUrl = await toPng(node, { cacheBust: true });
    
    // إعداد PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.setFontSize(14)
    pdf.text(named,10,20)
    pdf.setFontSize(12)
    pdf.text(`Date de a : ${date}`,10,30)
    pdf.text(`Mass Horaire :${massHorraire} h`,130,30)
    pdf.addImage(dataUrl, "PNG", 10, 40, pdfWidth-20, pdfHeight);
    pdf.save(`${named} au ${date}.pdf`);
  } catch (error) {
    console.error("❌ Error exporting table:", error);
  }
}

// import autoTable from 'jspdf-autotable';

// export const exportAsPdf = ({ data, columns, title }) => {
//   try {
//     // Create new PDF document
//     const doc = new jsPDF();

//     // Add title
//     doc.setFontSize(16);
//     doc.text(title, 14, 15);
    
//     // Prepare the data for the table
//     const tableColumn = columns.map(col => col.header);
//     const tableRows = data.map(row =>
//       columns.map(col => {
        
//         return row[col.field];
//       })
//     );

//     // Generate the table using the autoTable plugin
//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 25,
//       styles: {
//         fontSize: 10,
//         cellPadding: 3,
//         lineColor: [200, 200, 200],
//         lineWidth: 0.1,
//       },
//       headStyles: {
//         fillColor: [71, 85, 105],
//         textColor: 255,
//         fontSize: 10,
//         fontStyle: 'bold',
//       },
//       alternateRowStyles: {
//         fillColor: [245, 245, 245],
//       },
//       margin: { top: 20 },
//     });

//     // Save the PDF
//     doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);

//     return true;
//   } catch (error) {
//     console.error('Error exporting to PDF:', error);
//     return false;
//   }
// };