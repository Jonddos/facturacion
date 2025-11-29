import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoicePDF = (invoice: any, details: any[]) => {
    const doc = new PDFDocument({ margin: 40 });

    const filename = `Factura_${invoice.invoiceNumber}.pdf`;
    const filepath = path.join(__dirname, "../../../temp", filename);

    if (!fs.existsSync(path.join(__dirname, "../../../temp"))) {
        fs.mkdirSync(path.join(__dirname, "../../../temp"));
    }

    const writeStream = fs.createWriteStream(filepath);
    doc.pipe(writeStream);

    // ---------- TÍTULO ----------
    doc.fontSize(22).fillColor("#4A148C").text(`Factura #${invoice.invoiceNumber}`);
    doc.moveDown(1);

    // ---------- DATOS ----------
    doc.fillColor("black").fontSize(12);
    doc.text(`Fecha de emisión: ${new Date(invoice.issueDate).toLocaleDateString()}`);
    doc.text(`Fecha de vencimiento: ${new Date(invoice.dueDate).toLocaleDateString()}`);

    doc.moveDown(1);
    doc.fontSize(16).text("Datos del Cliente", { underline: true });
    doc.fontSize(12);
    doc.text(`Nombre: ${invoice.clientName}`);
    doc.text(`Cédula: ${invoice.clientIdentification}`);
    doc.text(`Email: ${invoice.clientEmail}`);

    doc.moveDown(1.5);

    // ------------------------------------------------------------
    // 🟣 TABLA RENDERIZADA MANUALMENTE (SIEMPRE FUNCIONA)
    // ------------------------------------------------------------
    doc.fontSize(16).fillColor("#4A148C").text("Ítems de la Factura");
    doc.moveDown(0.8);
    doc.fillColor("black").fontSize(12);

    const tableTop = doc.y;
    const columnWidths = [70, 150, 60, 80, 60, 80];
    const headers = ["Código", "Nombre", "Cant", "Precio", "IVA", "Total"];

    // ---------- DIBUJAR ENCABEZADOS ----------
    let x = 40;
    headers.forEach((header, i) => {
        doc.font("Helvetica-Bold").text(header, x, tableTop);
        x += columnWidths[i];
    });

    // Línea debajo del header
    doc.moveTo(40, tableTop + 15)
        .lineTo(40 + columnWidths.reduce((a, b) => a + b), tableTop + 15)
        .stroke();

    // ---------- FILAS ----------
    let y = tableTop + 25;

    details.forEach((item) => {
        let x = 40;

        const row = [
            item.itemCode,
            item.itemName,
            item.quantity.toString(),
            `$${item.unitPrice.toFixed(2)}`,
            item.appliesTax ? `$${item.taxAmount.toFixed(2)}` : "$0",
            `$${item.total.toFixed(2)}`,
        ];

        row.forEach((cell, i) => {
            doc.font("Helvetica").fontSize(11).text(cell, x, y);
            x += columnWidths[i];
        });

        y += 20;

        // Línea entre filas
        doc.moveTo(40, y - 5)
            .lineTo(40 + columnWidths.reduce((a, b) => a + b), y - 5)
            .strokeColor("#dddddd")
            .stroke();
    });

    doc.moveDown(2);

    // ---------- TOTALES ----------
    doc.fontSize(16).fillColor("#4A148C").text("Totales", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor("black");
    doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`);
    doc.text(`IVA total: $${invoice.taxTotal.toFixed(2)}`);
    doc.text(`Total a pagar: $${invoice.total.toFixed(2)}`);

    doc.end();
    return filepath;
};
