import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ValidationPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { mapUserDtoToPrisma, mapUserEntityToUserResponseDto } from './mapper/user.mapper';
import { map } from 'rxjs';


@Controller('users')
export class UserController {
    constructor(private readonly userService : UserService) {}

    // Get all users
    @Get()
    getUsers() {
        return this.userService.getUsers();
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