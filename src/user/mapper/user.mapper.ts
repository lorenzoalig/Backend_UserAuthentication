import { Prisma, User } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import { InternalServerErrorException } from "@nestjs/common";

export function mapUserDtoToPrisma(dto: CreateUserDto) : Prisma.UserCreateInput {
    const prismaInput: Prisma.UserCreateInput = {
        first_name: dto.first_name,
        last_name: dto.last_name,
        age: dto.age,
        gender: dto.gender,
        birth_date: dto.birth_date,
        credentials: {
            create: {
                username: dto.credentials.create.username,
                email: dto.credentials.create.email,
                password: dto.credentials.create.password,
                rank: dto.credentials.create.rank
            }
        }
    };
    return prismaInput;
}

export function mapUserEntityToUserResponseDto (
    user: User & { credentials: { email: string; username: string; password: string; rank: number, credentialsId: number; userId: number } | null }
) : UserResponseDto{
    if (!user.credentials) {
        throw new InternalServerErrorException("User credentials missing");
    }
    const userResponse = {
        userId: user.userId,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        gender: user.gender,
        birth_date: user.birth_date,
        rank: user.credentials.rank,
        username: user.credentials.username,
        email: user.credentials.email
    };
    return userResponse;
}