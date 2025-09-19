import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { mapUserDtoToPrisma, mapUserEntityToUserResponseDto } from './mapper/user.mapper';
import { PdfService } from '../report/report.service';
import type { Response } from 'express';
import { RankGuard } from './guards/rank.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('users')
export class UserController {
    constructor(
        private readonly userService : UserService,
        private readonly pdfService : PdfService
    ) {}

    // Get all users
    @Get()
    getUsers() {
        return this.userService.getUsers();
    }
    
    // Get user report
    @Get('report')
    @UseGuards(AuthGuard, RankGuard)
    printPdf(@Res() res: Response) {
        const doc = this.pdfService.generateReport();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-disposition', 'inline; filename=relatorio.pdf');

        doc.pipe(res);
        doc.end();
    }

    // Get a single user
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.findUserById(+id);
    }

    // Create an user
    @Post()
    async createUser(
        @Body(new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted:true
        })) 
        createDto : CreateUserDto
    ) {
        const prismaInput = mapUserDtoToPrisma(createDto);
        const user = await this.userService.createUser(prismaInput);
        return mapUserEntityToUserResponseDto(user);
    }

    // Update an user
    @Patch(':id')
    updateUser(@Param('id') id : string, @Body() body : Prisma.User_infoUpdateInput) {
        return this.userService.updateUser(+id, body);
    }

    // Delete an user
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(+id);
    }

};