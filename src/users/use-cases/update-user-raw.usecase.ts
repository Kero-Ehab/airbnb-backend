import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import {ClientSession, UpdateQuery} from "mongoose";
import { User } from "../schemas/user.schema";

@Injectable()
export class updateUserRawUseCase{
    constructor(
        private readonly userRepository:UserRepository
    ){}

    async execute(
        filterQuery:UpdateQuery<User>,
        data:Record<string, unknown>,
        session?:ClientSession
    ):Promise<void>{
        await this.userRepository.findOneAndUpdate(
            filterQuery,
            data, 
            {session}
        );
    }
}