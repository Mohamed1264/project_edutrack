import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const exportedDays = {
  'Monday': 'Lundi',
  'Tuesday': 'Mardi',
  'Wednesday': 'Mercredi',
  'Thursday': 'Jeudi',
  'Friday': 'Vendredi',
  'Saturday': 'Samedi',
};
export const exportScheduleAsPdf = ({ schedule, days, sessions, entityName,entity,numberHours ,item }) => {
  const getGender = (gender) => {
    return gender === 'Male' ? 'Mr' : 'Mme'
}
const title = entity === 'teacher' ? `${getGender(item.gender)} ${entityName}` : `${entity} ${entityName}`

  
  try {
    // Create new PDF document in landscape orientation with half A4 size
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4' // Half of A4 (297 x 210)
    });

// Or load from a URL (but you need to handle this asynchronously)

    // Add the image at the top of the document
    doc.addImage(
      imgData,
      'JPEG', // or 'PNG', 'WEBP', etc.
      85, // x position (margin from left)
      5, // y position (margin from top)
      27, // width of the image in mm or points
      17// height of the image in mm or points
    );
    doc.setFontSize(8);
    doc.text(`ISTA DAKHLA`, 10, 15);
    doc.setFontSize(9);
    doc.text(`Annee de formation : 2024 / 2025`, 150, 15);

    // Add title with smaller font
    doc.setFontSize(14);
    // doc.text(`${entity } : ${entityName}`, 10, 30);
    // doc.text(`${schedule.length * 2.5} Heures`, 170, 15);
    
    const pageWidth = doc.internal.pageSize.width - 20;
    const barHeight = 10; // height of the bar in mm
    const barY1 = 32; // Y position of the bar from top of page
    const barY2 = 119; // Y position of the bar from top of page


    // Draw the gray bar
      doc.setFillColor(238, 242, 255); // Light gray color matching your example
      doc.rect(10, barY1, pageWidth, barHeight, 'F'); // 'F' means fill
     
      doc.rect(10, barY2, pageWidth, barHeight, 'F'); // 'F' means fill
      // Add text to the bar
      doc.setTextColor(67, 56, 202); 
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');

      // Center the text in the bar
      const text1 = 'A partir du 07-04-2025';
      const text2 = 'NB:POUR LE VENDREDI:SEANCE 1 (08h30-10h30) SEANCE 2 (10h30-12h30) SEANCE 3 (15h-17h) SEANCE 4 (17h-19h)';
      const textWidth1 = doc.getStringUnitWidth(text1) * doc.internal.getFontSize() / doc.internal.scaleFactor;
     
      const textX1 = (pageWidth - textWidth1) / 2 + 10;
     
      const textY1 = barY1 + barHeight/2 + 1; // Centered vertically in the bar (with a small adjustment)


      doc.text(text1, textX1, textY1);
      doc.text(title, 10, 47);
      doc.text(`Mh : ${numberHours}`, 185, 47);
      doc.setFontSize(8);
      const textWidth2 = doc.getStringUnitWidth(text2) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const textY2 = 125.5; // Centered vertically in the bar (with a small adjustment)
      const textX2 = (pageWidth - textWidth2) / 2 + 10;
      doc.text(text2, textX2, textY2);




    // Create headers array with time slots
    const headers = ['', ...sessions.map(session => `${session.start} - ${session.end}`)];

    // Create body data
    const bodyData = days.map(day => {
      const rowData = [exportedDays[day]];
      sessions.forEach(session => {
        const matchingSession = schedule.find(s => 
          s.day_of_week === day && 
          s.start_time === session.start
        );

        if (matchingSession) {
          rowData.push({
            content: `${matchingSession.group_name}\n${matchingSession.room_name == null ? 'A distance' : matchingSession.room_name}`,
            styles: {
              
              textColor:  [55, 65, 81],
              fontStyle: 'bold',
              halign: 'center',
              valign: 'middle'
            }
          });
        } else {
          rowData.push('');
        }
      });
      return rowData;
    });

    // Generate the table with smaller dimensions
    autoTable(doc, {
      head: [headers],
      body: bodyData,
      startY: 52,
      styles: {
        fontSize: 7,
        cellPadding: 2,
        lineColor: [67, 56, 202],
        lineWidth: 0.1,
        minCellHeight: 7
      },
      headStyles: {
        fillColor: [238, 242, 255],
        textColor: [67, 56, 202],
        fontSize: 10,
        fontStyle: 'bold',
       
        halign: 'center',
        valign: 'middle',
        cellPadding: 2
      },
      columnStyles: {
        0: { // Days column
          fillColor: [238, 242, 255],
          textColor: [67, 56, 202],
          fontStyle: 'bold',
          fontSize:10,
          valign:'middle',
          halign: 'left',
          cellWidth: 25
        },
        1: { cellWidth: 33 }, // First time slot
        2: { cellWidth: 33 }, // Second time slot
        3: { cellWidth: 33 }, // Third time slot
        4: { cellWidth: 33 }, // Fourth time slot
        5: { cellWidth: 33 }  // Fifth time slot
      },
      didParseCell: function(data) {
        // Center align all cells except the first column (days)
        if (data.column.index !== 0) {
          data.cell.styles.halign = 'center';
        }
      },
      willDrawCell: function(data) {
        // Add custom styling for cells with content
        if (data.row.section === 'body' && data.column.index > 0) {
          const cell = data.cell;
          if (cell.text && cell.text.length > 0) {
            if (!cell.styles.fillColor) {
              cell.styles.fillColor = [240, 240, 255];
            }
            if (!cell.styles.textColor) {
              cell.styles.textColor = [100, 50, 200];
            }
          }
        }
      },
      margin: { top: 20, left: 10, right: 10 }
    });

    // Add footer with smaller font
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(6);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 5,
        { align: 'center' }
      );
    }

    // Save the PDF
    doc.save(`schedule-${entityName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);

    return true;
  } catch (error) {
    console.error('Error exporting schedule to PDF:', error);
    return false;
  }
}; 