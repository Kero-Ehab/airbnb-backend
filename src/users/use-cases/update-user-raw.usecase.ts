import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UpdateUserRawUseCase{
    constructor(
        private readonly userRepository:UserRepository
    ){}

    async execute(
        userId:string,
        body:UpdateUserDto,
    ){
        return await this.userRepository.findByIdAndUpdate(
           userId,
           body,
           {
            returnDocument: 'after',
            lean:true
           }
        );
    }
}