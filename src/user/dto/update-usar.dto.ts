import { Gender } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";


export class UpdateCredentialsDto {
    @IsString()
    @IsOptional()
    @MinLength(5)
    @MaxLength(16)
    username: string;
    
    @IsEmail()
    @IsOptional()
    email: string;
        
    @IsString()
    @IsOptional()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    rank: number;
}

export class UpdateCredentialsWrapperDto { 
    @ValidateNested()
    @IsOptional()
    @Type(() => UpdateCredentialsDto)
    update: UpdateCredentialsDto
}

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MaxLength(15)
    @MinLength(3)
    first_name: string;
    
    @IsString()
    @IsOptional()
    @MaxLength(15)
    @MinLength(3)
    last_name: string;

    @IsInt()
    @IsOptional()
    @Max(140)
    @Min(0)
    @Type(() => Number)
    age: number;

    @IsString()
    @IsOptional()
    @IsEnum(Gender)
    gender: Gender;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    birth_date: Date;

    @ValidateNested()
    @IsOptional()
    @Type(() => UpdateCredentialsWrapperDto)
    credentials: UpdateCredentialsWrapperDto;
}