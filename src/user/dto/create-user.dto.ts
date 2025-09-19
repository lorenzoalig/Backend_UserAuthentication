import { Gender } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsString, IsStrongPassword, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";


export class CreateUserCredentialsDto { 
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(16)
    username: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
     
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    rank: number;
}

export class CreateUserCredentialsWrapperDto {
    @ValidateNested()
    @IsNotEmpty()
    @Type(() => CreateUserCredentialsDto)
    create: CreateUserCredentialsDto
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(3)
    first_name: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(3)
    last_name: string;

    @IsInt()
    @IsNotEmpty()
    @Max(140)
    @Min(0)
    @Type(() => Number)
    age: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    birth_date: Date;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => CreateUserCredentialsWrapperDto)
    credentials: CreateUserCredentialsWrapperDto;
}