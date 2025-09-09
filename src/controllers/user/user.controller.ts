import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UserController {
    // Get all users
    @Get()
    getUsers() : string {
        return 'users';
    }
    
    // Get a single user
    @Get(':id')
    getUser(@Param() id: string) : string {
        return id;
    }

    // Create an user
    @Post()
    createUser(@Body() body: string) {
        return body;
    }

    // Update an user
    @Put(':id')
    updateUser(@Param() id: string, @Body() body: string) {
        return {message: 'User updated succesfully', user: id, newData: body};
    }

    // Delete an user
    @Delete(':id')
    deleteUser(@Param() id: string) {
        return {message: 'User deleted succesfully', user: id};
    }
};