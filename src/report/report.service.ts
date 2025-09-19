import { Injectable } from "@nestjs/common";
import PDFDocument from "pdfkit";

@Injectable()
export class PdfService {
    generateReport() : PDFDocument {
        const doc = new PDFDocument();
        doc.fontSize(25)
            .text('Uhuuu, olha eu aqui!', 100, 100);
        return doc;
    }
}