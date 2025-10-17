import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export const exportToPDF = async (targetId, owner, name, date, mass) => {
  try {
    const named = owner[name] ? owner[name] : owner.user[name];
    const massHorraire = mass.length * 2.5;

    const node = document.getElementById(targetId);
    if (!node) {
      alert("⚠️ Table non trouvée !");
      return;
    }

    // 🔹 Capture HTML as image
    const dataUrl = await toPng(node, { cacheBust: true });

    // 🔹 Setup PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(dataUrl);
    const tableHeight = (imgProps.height * (pdfWidth - 20)) / imgProps.width;

   
   
    // === INFO SECTION ===
    pdf.setFontSize(12);
    pdf.setTextColor(60, 60, 60);
    pdf.text(`Nom : ${named}`, 10, 15);
    pdf.text(`Date : ${date.datation}`, 10, 22);
    pdf.text(`Masse Horaire Totale : ${massHorraire} h`, 10, 29);

    // === TABLE IMAGE ===
    pdf.addImage(dataUrl, "PNG", 10, 40, pdfWidth - 20, tableHeight);

    // === FOOTER ===
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, pdfHeight - 20, pdfWidth - 10, pdfHeight - 20);
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Document généré automatiquement - ISTA DAKHLA 2025", pdfWidth / 2, pdfHeight - 10, {
      align: "center",
    });

    // === SAVE FILE ===
    pdf.save(`${named}_rapport_${date.datation}.pdf`);
  } catch (error) {
    console.error("❌ Erreur lors de l’exportation :", error);
  }
};
