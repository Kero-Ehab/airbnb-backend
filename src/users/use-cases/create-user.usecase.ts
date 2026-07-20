import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserRepository } from "../repository/user.repository";
import * as bcrypt from 'bcrypt';







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
            throw new Error('Email already exists');
        }
        const existingUserPhoneNumber = await this.userRepository.findOne({
            phoneNumber: createUserDto.phoneNumber
        })
        if(existingUserPhoneNumber){
            throw new Error('Phone number already exists');
        }
        const hashedPassword = await bcrypt.hash(
            createUserDto.password, 
            this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 10
        );

        const user = await this.userRepository.create({
            ...createUserDto,
            password:hashedPassword,
        })

        return user;

    }




}