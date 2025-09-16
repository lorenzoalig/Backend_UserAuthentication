import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma, User_credentials } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user-dto';


@Injectable()
export class UserService {
    saltRounds : number = 12;

    constructor(private readonly databaseService : DatabaseService) {}

    // Get all users
    async getUsers() {
        return await this.databaseService.user_info.findMany({});
    }

    // Get a single user
    async getUser(user_id: number) {
        return await this.databaseService.user_info.findUnique ({
            where: {
                user_id
            }
        })
    }

    // Create a user
    async createUser(dto : CreateUserDto) {
        const prismaInput: Prisma.User_infoCreateInput = {
            first_name: dto.first_name,
            last_name: dto.last_name,
            age: dto.age,
            gender: dto.gender,
            birth_date: dto.birth_date,
            user_credentials: {
                create: {
                    username: dto.user_credential.create.username,
                    email: dto.user_credential.create.email,
                    password: dto.user_credential.create.password,
                }
            }
        };
        
        let password = prismaInput.user_credentials?.create?.password;
        console.log(password);
        password = await bcrypt.hash(password, this.saltRounds);
        console.log(password);
        
        if(!password) throw new InternalServerErrorException('Problem with password hashing');
        prismaInput.user_credentials!.create!.password = password;
        return await this.databaseService.user_info.create({
            data: prismaInput,
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
                username
            }
        });
    }
}
