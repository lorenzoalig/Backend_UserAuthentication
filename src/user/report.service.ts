import { Injectable, InternalServerErrorException, Req } from "@nestjs/common";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { UserService } from "./user.service";
import { UserResponseDto } from "./dto/user-response.dto";
import { MapperService } from "./mapper/user.mapper";


@Injectable()
export class PdfService {
    constructor(
        private readonly userService: UserService,
        private readonly mapperService: MapperService
    ) {}
    
    async createReport(@Req() req) : Promise<PDFDocument> {
        const userId = req.user.userId;
        const user = await this.userService.findUserById(userId);
        
        if(!user) throw new InternalServerErrorException("User not found")
        const responseDto = this.mapperService.mapUserEntityToUserResponseDto(user);
        return this.generatePdf(responseDto);
    }
    
    
    async generatePdf(responseDto: UserResponseDto) : Promise<PDFDocument> {
        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
        });

        // Disclaimer: PDF template generated with AI - not IP of the author

        // ==== HEADER ====
        const logoPath = path.join(process.cwd(), "assets", "techlo-logo.png");
        doc.image(logoPath, 50, 5, { width: 125 });
        doc.fontSize(14).text("User Report", 262, 70);
        doc.moveTo(50, 100).lineTo(550, 100).stroke();

        // ==== CONTENT ====
        doc.moveDown(5);
        doc.fontSize(12).text("User ID: " + responseDto.userId, 90, 180);
        doc.text("First Name: " + responseDto.first_name);
        doc.text("Last Name: " + responseDto.last_name);
        doc.text("Age: " + responseDto.age);
        doc.text("Gender: " + responseDto.gender);
        doc.text("Birth Date: " + responseDto.birth_date);
        doc.text("Rank: " + responseDto.rank);
        doc.text("Username: " + responseDto.username);
        doc.text("Email: " + responseDto.email);

        // ==== FOOTER ====
        const footerY = doc.page.height - 80;
        doc.moveTo(50, footerY).lineTo(550, footerY).strokeColor("#999").lineWidth(1).stroke();
        doc.fontSize(9)
        .fillColor("#666")
        .text("© 2025 Techlo — Fiction made real", 50, footerY + 10, {
            align: "center",
            width: doc.page.width - 100,
        });

        // QRCode generator
        const portfolioUrl = "https://github.com/lorenzoalig";
        const qrDataUrl = await QRCode.toDataURL(portfolioUrl);
        const imgBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
        const imgBuffer = Buffer.from(imgBase64, "base64");
        doc.image(imgBuffer, 360, footerY - 200, { width: 165 });

        return doc;
    }
}