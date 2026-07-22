import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserRawUseCase } from './use-cases/update-user-raw.usecase';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Post()
    createUser(@Body() dto:CreateUserDto){
        return this.usersService.create(dto)
    }
    @Get(':id')
    findUser(@Param('id') id: string){
        return this.usersService.findOne({_id:id})
    }
    @Patch(':id')
    updateuser(
        @Param('id')id: string,
        @Body() updateUserDto: UpdateUserDto
    ){
        return this.usersService.updateUserRaw(id, updateUserDto)
    }


}
