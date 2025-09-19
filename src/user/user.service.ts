import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Credentials, Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    saltRounds : number = 12;

    constructor(
        private readonly databaseService : DatabaseService
        //PRIVATE READONLY mapperSerivce : MapperService
    ) {}

    // Get all users
    async getUsers() {
        return await this.databaseService.user.findMany({});
    }

    // Get a single user by their ID
    async findUserById(userId: number) {
        return await this.databaseService.user.findUnique({
            where: {
                userId
            },
            include : { credentials: true }
        });
    }

    // Create a user
    async createUser(prismaInput: Prisma.UserCreateInput) {
        let password = prismaInput.credentials?.create?.password
        password = await bcrypt.hash(password, this.saltRounds);
        
        if(!password) throw new InternalServerErrorException('Problem with password hashing');
        prismaInput.credentials!.create!.password = password;
        return await this.databaseService.user.create({
            data: prismaInput,
            include: { credentials: true }
        })
    }

    // Update an user
    async updateUser(userId: number, userUpdateDto: Prisma.UserUpdateInput) {
        return await this.databaseService.user.update({
            where: {
                userId
            },
            data: userUpdateDto
        });
    }

    // Delete an user
    async deleteUser(userId: number) {
        const user = await this.findUserById(userId);
        
        if(!user) throw new NotFoundException("User not found");
        try{
            return await this.databaseService.user.delete({
                where: {
                    userId,
                }
            });
        } catch (error) {
            throw new BadRequestException('User not found');
        }
    }
    
    // Find user by username
    async findUserByUsername(username: string) : Promise<Credentials | null>{
        return await this.databaseService.credentials.findUnique({
            where: {
                username
            }
        });
    }

    // Find user by email
    async findUserByEmail(email: string) : Promise<Credentials | null> {
        const user = await this.databaseService.credentials.findFirst({
            where: {
                email
            }
        });
        return user;
    }
}
