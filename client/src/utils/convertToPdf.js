import { PDFDocument } from 'pdf-lib';

export const convertDocxToPdf = async (docxData) => {
    try {
        // Crează un nou document PDF
        const pdfDoc = await PDFDocument.create();

        // Converteste docx in pdf
        const text = docxData.toString('utf-8');
        const page = pdfDoc.addPage();
        page.drawText(text, {
            x: 50,
            y: page.getHeight() - 50,
            size: 12,
        });

        // Returnează datele binare ale PDF-ului
        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    } catch (error) {
        console.error('Error converting DOCX to PDF:', error.message);
        throw error;
    }
};

