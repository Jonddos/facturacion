import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (invoice: any, details: any[]) => {
    const doc = new jsPDF();

    // ------- ENCABEZADO -------
    doc.setFontSize(18);
    doc.text(`Factura #${invoice.invoiceNumber}`, 14, 20);

    doc.setFontSize(12);
    doc.text(`Fecha de emisión: ${new Date(invoice.issueDate).toLocaleDateString()}`, 14, 30);
    doc.text(`Fecha de vencimiento: ${new Date(invoice.dueDate).toLocaleDateString()}`, 14, 36);

    // ------- DATOS DEL CLIENTE -------
    doc.setFontSize(14);
    doc.text("Datos del cliente:", 14, 48);

    doc.setFontSize(11);
    doc.text(`Nombre: ${invoice.clientName}`, 14, 56);
    doc.text(`Cédula: ${invoice.clientIdentification}`, 14, 62);
    doc.text(`Correo: ${invoice.clientEmail}`, 14, 68);

    // ------- TABLA DE ITEMS -------
    const tableColumn = ["Código", "Nombre", "Cantidad", "Precio", "IVA", "Total"];

    const tableRows: any[] = [];

    details.forEach((item) => {
        tableRows.push([
            item.itemCode,
            item.itemName,
            item.quantity,
            `$${item.unitPrice.toFixed(2)}`,
            item.appliesTax ? `$${item.taxAmount.toFixed(2)}` : "0",
            `$${item.total.toFixed(2)}`,
        ]);
    });

    autoTable(doc, {
        startY: 78,
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
        headStyles: { fillColor: "#4a148c" },
    });

    // ------- TOTALES -------
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 14, finalY);
    doc.text(`IVA total: $${invoice.taxTotal.toFixed(2)}`, 14, finalY + 8);
    doc.setFontSize(14);
    doc.text(`Total a pagar: $${invoice.total.toFixed(2)}`, 14, finalY + 20);

    // ------- DESCARGA -------
    doc.save(`Factura_${invoice.invoiceNumber}.pdf`);
};
