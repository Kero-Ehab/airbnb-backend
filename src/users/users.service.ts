import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UpdateUserRawUseCase } from './use-cases/update-user-raw.usecase';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientSession, QueryFilter, UpdateQuery } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

 

@Injectable()
export class UsersService {
    constructor(
        private readonly createUserUsecase:CreateUserUseCase,
        private readonly updateUserRawUseCase:UpdateUserRawUseCase,
        private readonly userReposatory:UserRepository
    ){}

    async create(createUserDto:CreateUserDto){
        return await this.createUserUsecase.execute(createUserDto)
    }

    async updateUserRaw(
        query: UpdateQuery<User>,
        data: Record<string, unknown>,
        session?:ClientSession
    ):Promise<void>{
        return this.updateUserRawUseCase.execute(query, data, session);

    }

    async findOne(query: QueryFilter<User>):Promise<UserResponseDto>{
        const user = await this.userReposatory.findOne(query)
        return plainToInstance(UserResponseDto, user)
    }
}




