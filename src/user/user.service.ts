import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Credentials, Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { MapperService } from './mapper/user.mapper';


@Injectable()
export class UserService {
    saltRounds: number = 12;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly mapperService: MapperService
    ) {}

    // Get all users
    async showAllUsers() {
        return await this.databaseService.user.findMany({
            where: {
                deletedAt: null
            }
        });
    }

    // Get a single user by their ID
    async findUserById(userId: number) {
        return await this.databaseService.user.findUnique({
            where: {
                userId
            },
            include: { credentials: true }
        });
    }

    // Create a user
    async createUser(prismaInput: Prisma.UserCreateInput) {
        let password = prismaInput.credentials?.create?.password
        password = await bcrypt.hash(password, this.saltRounds);

        if (!password) throw new InternalServerErrorException('Problem with password hashing');
        prismaInput.credentials!.create!.password = password;
        return await this.databaseService.user.create({
            data: prismaInput,
            include: { credentials: true }
        })
    }

    // Update an user
    async updateUser(userId: number, prismaUpdate: Prisma.UserUpdateInput) {
        return await this.databaseService.user.update({
            where: {
                userId
            },
            data: {
                ...prismaUpdate,
                updatedAt: new Date()
            },
            include: { credentials: true }
        });
    }

    // Delete an user
    async toggleUser(userId: number): Promise<UserResponseDto> {
        const user = await this.findUserById(userId);
        let alteredUser;

        if (!user) throw new NotFoundException("User not found");
        try {
            if (user.deletedAt == null)
                alteredUser = await this.deactivateUser(user);
            else
                alteredUser = await this.activateUser(user);

            if (!alteredUser) throw new InternalServerErrorException('Error: could not activate or deactivate user')
            return this.mapperService.mapUserEntityToUserResponseDto(alteredUser);
        } catch (error) {
            throw new InternalServerErrorException('Error: could not activate or deactivate user');
        }
    }

    async deactivateUser(user: User): Promise<User | null> {
        return await this.databaseService.user.update({
            where: { userId: user.userId },
            data: { deletedAt: new Date() },
            include: { credentials: true }
        });
    }

    async activateUser(user: User): Promise<User | null> {
        return await this.databaseService.user.update({
            where: { userId: user.userId },
            data: { deletedAt: null },
            include: { credentials: true }
        });
    }

    // Find user by username
    async findUserByUsername(username: string): Promise<Credentials | null> {
        return await this.databaseService.credentials.findUnique({
            where: {
                username
            }
        });
    }

    // Find user by email
    async findUserByEmail(email: string): Promise<Credentials | null> {
        const user = await this.databaseService.credentials.findFirst({
            where: {
                email
            }
        });
        return user;
    }
}