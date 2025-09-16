import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';


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
        return this.userService.getUser(+id);
    }

    // Create an user
    @Post()
    createUser(@Body() userCreateDto : Prisma.User_infoCreateInput) {
        return this.userService.createUser(userCreateDto);
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