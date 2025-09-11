import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class UserService {
    constructor(private readonly databaseService : DatabaseService) {}

    // Get all users
    async getUsers() {
        return await this.databaseService.user_info.findMany({});
    };

    // Get a single user
    async getUser(user_id: number) {
        return await this.databaseService.user_info.findUnique ({
            where: {
                user_id
            }
        })
    }

    // Create a user
    async createUser(userCreateDto : Prisma.User_infoCreateInput) {
        return await this.databaseService.user_info.create({
            data: userCreateDto,
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
        return await this.databaseService.user_info.delete({
            where: {
                user_id,
            }
        });
    }
}
