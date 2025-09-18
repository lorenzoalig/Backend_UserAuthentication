import { Prisma, User_info } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserResponseDto } from "../dto/user-response.dto";

export function mapUserDtoToPrisma(dto: CreateUserDto) : Prisma.User_infoCreateInput {
    const prismaInput: Prisma.User_infoCreateInput = {
        first_name: dto.first_name,
        last_name: dto.last_name,
        age: dto.age,
        gender: dto.gender,
        birth_date: dto.birth_date,
        rank: dto.rank,
        user_credentials: {
            create: {
                username: dto.user_credentials.create.username,
                email: dto.user_credentials.create.email,
                password: dto.user_credentials.create.password,
            }
        }
    };
    return prismaInput;
}

export function mapUserEntityToUserResponseDto (
    user: User_info & { user_credentials: { email: string; username: string; password: string; credentials_id: number; user_infoId: number } | null }
) : UserResponseDto{
    if (!user.user_credentials) {
        throw new Error("User credentials not found");
    }
    const userResponse = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
        gender: user.gender,
        birth_date: user.birth_date,
        username: user.user_credentials.username,
        email: user.user_credentials.email
    };
    return userResponse;
}