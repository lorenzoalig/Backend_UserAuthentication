import { Type } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsInt, IsNotEmpty, IsNotEmptyObject, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";


export class CreateUserCredentialDto { 
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
    @MinLength(8)
    @MaxLength(20)
    password: string;
}

export class CreateUserCredentialWrapperDto {
    @ValidateNested()
    @Type(() => CreateUserCredentialDto)    
    create: CreateUserCredentialDto
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
    @IsIn(['Male', 'Female', 'Other'])
    gender: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    birth_date: Date;

    @ValidateNested()
    @IsNotEmpty()
    @Type(() => CreateUserCredentialWrapperDto)
    user_credential: CreateUserCredentialWrapperDto;
}