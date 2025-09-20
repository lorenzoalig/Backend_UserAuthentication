import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PdfService } from './report.service';
import type { Request, Response } from 'express';
import { RankGuard } from './guards/rank.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dto/update-usar.dto';
import { MapperService } from './mapper/user.mapper';


@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly pdfService: PdfService,
        private readonly mapperService: MapperService
    ) {}

    // Get single user report
    @Get('report')
    @UseGuards(AuthGuard, RankGuard)
    async getReport(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const doc = await this.pdfService.createReport(req);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-disposition', 'inline; filename=relatorio.pdf');
        doc.pipe(res);
        doc.end();
    }

    // =======================================================
    // ======================== CRUD =========================
    // =======================================================

    // ======================= CREATE ========================
    // Create an user
    @Post()
    async createUser(
        @Body(new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true
        }))
        createDto: CreateUserDto
    ) {
        const prismaInput = this.mapperService.mapUserCreateDtoToPrisma(createDto);
        const user = await this.userService.createUser(prismaInput);
        return this.mapperService.mapUserEntityToUserResponseDto(user);
    }

    // ======================== READ =========================
    // Get all users
    @Get()
    getUsers() {
        return this.userService.showAllUsers();
    }

    // Get a single user
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.findUserById(+id);
    }

    // ======================= UPDATE ========================
    // Update an user
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body(new ValidationPipe(
            {
                transform: true,
                whitelist: true,
                forbidNonWhitelisted: true
            }
        )) dto: UpdateUserDto
    ) {
        const prismaUpdate = this.mapperService.mapUpdateUserDtoToPrisma(dto);
        const user = await this.userService.updateUser(+id, prismaUpdate);
        return this.mapperService.mapUserEntityToUserResponseDto(user);
    }

    // ======================= DELETE ========================
    // Delete an user
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.toggleUser(+id);
    }
};