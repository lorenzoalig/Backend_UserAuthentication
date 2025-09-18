import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, User_credentials, User_info } from '@prisma/client';
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
        return await this.databaseService.user_info.findMany({});
    }

    // Get a single user by their ID
    async findUserById(user_id: number) : Promise<User_info | null>{
        return await this.databaseService.user_info.findUnique({
            where: {
                user_id
            }
        });
    }

    // Create a user
    async createUser(prismaInput: Prisma.User_infoCreateInput) {
        let password = prismaInput.user_credentials?.create?.password
        password = await bcrypt.hash(password, this.saltRounds);
        
        if(!password) throw new InternalServerErrorException('Problem with password hashing');
        prismaInput.user_credentials!.create!.password = password;
        return await this.databaseService.user_info.create({
            data: prismaInput,
            include: { user_credentials: true}
        })
    }

    // Update an user
    async updateUser(user_id: number, userUpdateDto: Prisma.User_infoUpdateInput) {
        return await this.databaseService.user_info.update({
            where: {
                user_id,
            },
            data: userUpdateDto
        });
    }

    // Delete an user
    async deleteUser(user_id: number) {
        const user = await this.findUserById(user_id);
        
        if(!user) throw new NotFoundException("User not found");
        try{
            return await this.databaseService.user_info.delete({
                where: {
                    user_id,
                }
            });
        } catch (error) {
            throw new BadRequestException('User not found');
        }
    }
    
    // Find user by username
    async findUserByUsername(username: string) : Promise<User_credentials | null>{
        return await this.databaseService.user_credentials.findUnique({
            where: {
                username,
            }
        });
    }

    // Find user by email
    async findUserByEmail(email: string) : Promise<User_credentials | null> {
        const user = await this.databaseService.user_credentials.findFirst({    // FIXME: migrate new prisma schema with email as unique
            where: {
                email
            }
        });
        return user;
    }
}
