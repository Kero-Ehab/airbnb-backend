import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { BadRequestExeption } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from "../dto/user-response.dto";
import { UserRepository } from "../repository/user.repository";
import { ConfigService } from "@nestjs/config";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CreateUserUseCase{
    constructor(
        private readonly userRepository:UserRepository,
        private readonly configService:ConfigService

    ){}

    async execute(createUserDto: CreateUserDto){
        const existingUserEmail = await this.userRepository.findOne({
            email: createUserDto.email 
        });
        if(existingUserEmail){
            throw new BadRequestExeption('Email already exists');
        }
        const existingUserPhoneNumber = await this.userRepository.findOne({
            phoneNumber: createUserDto.phoneNumber
        })
        if(existingUserPhoneNumber){
            throw new BadRequestExeption('Phone number already exists');
        }
        const hashedPassword = await bcrypt.hash(
            createUserDto.password, 
            this.configService.getOrThrow<number>('BCRYPT_SALT_ROUNDS') || 10
        );

        const createdUser = await this.userRepository.create({
            ...createUserDto,
            password:hashedPassword,
        })

        return plainToInstance(UserResponseDto, createdUser.toObject());
    }
}