import jsPDF from "jspdf";
import { toPng } from "html-to-image";
// 1. 🖼️ جلب الصورة كـ Variable
import logoImage from './ofppt.jpg'; // Path نسبي (relative) للصورة

export const exportToPDF = async (targetId, owner, name, firstDate, secondDate, mass) => {
    try {
        const named = owner[name] ? owner[name] : owner.user[name];
        const massHorraire = mass.length * 2.5;

        const node = document.getElementById(targetId);
        if (!node) {
            alert("⚠️ Table non trouvée !");
            return;
        }

        // 🔹 Capture HTML (dataUrl ديال الـ Table كيبقى هو هو)
        let dataUrl = null;
        try {
            dataUrl = await toPng(node, { cacheBust: true });
        } catch (err) {
            console.warn("ExportAsPdf: toPng failed, fallback to text-only PDF", err);
            dataUrl = null;
        }

        // 🧾 🔹 إعداد PDF
        const pdf = new jsPDF("l", "mm", [148.5, 210]); // نصف A4 أفقي
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // 💡 ما بقاش عندنا حاجَة بـ const IMAGE_URL = 'http://localhost:8000/images/logo.png';
        
        // Normalize dates
        firstDate = firstDate && firstDate !== "null" ? firstDate : new Date().toISOString().split("T")[0];
        secondDate = secondDate && secondDate !== "null" ? secondDate : new Date().toISOString().split("T")[0];

        // === LOGO IMAGE (جديد) ===
        const logoSize = 15;
        const logoX = pdfWidth - logoSize - 10;
        const logoY = 10;
        
        // 2. 🚀 إضافة الصورة مباشرة باستعمال الـ Variable ديال import
        if (logoImage) {
            // jsPDF كيقبل Path/URL اللي كيرجعو ليه Build Tools
            pdf.addImage(logoImage, 'JPEG', logoX, logoY, logoSize, logoSize);
        }

        // === HEADER INFO ===
        pdf.setFontSize(12);
        pdf.setTextColor(60, 60, 60);
        pdf.text(`${named}`, 10, 12);
        pdf.setFontSize(10);
        pdf.setTextColor(60, 60, 60);
        pdf.text(`du : ${firstDate} au ${secondDate}`, 10, 18);
        pdf.text(`Masse Horaire Totale : ${massHorraire} h`, 10, 24);
        

        // === TABLE IMAGE ===
        if (dataUrl) {
            const imgProps = pdf.getImageProperties(dataUrl);
            const tableHeight = (imgProps.height * (pdfWidth - 20)) / imgProps.width;

            // نضبط الصورة باش ما تتجاوزش نصف الصفحة
            const maxHeight = pdfHeight - 50;
            const finalHeight = Math.min(tableHeight, maxHeight);

            pdf.addImage(dataUrl, "PNG", 10, 30, pdfWidth - 20, finalHeight);
        } else {
            pdf.setFontSize(11);
            pdf.setTextColor(150, 0, 0);
            pdf.text("(Impossible d'afficher l'image de la table)", 10, 40);
        }

        // === FOOTER ===
        pdf.setDrawColor(200, 200, 200);
        pdf.line(10, pdfHeight - 15, pdfWidth - 10, pdfHeight - 15);
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Document généré automatiquement - ISTA DAKHLA 2025", pdfWidth / 2, pdfHeight - 8, {
            align: "center",
        });

        // === SAVE FILE ===
        const safeName = String(named).replace(/[^a-z0-9_\- ]/gi, "_");
        pdf.save(`${safeName}_rapport_${firstDate}_au_${secondDate}.pdf`);
    } catch (error) {
        console.error("❌ Erreur lors de l’exportation :", error);
    }
};