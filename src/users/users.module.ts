import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UserRepository } from './repository/user.repository';
import { UpdateUserRawUseCase } from './use-cases/update-user-raw.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:ModelNames.USERS, schema:UserSchema}])],
  controllers: [UsersController],
  providers: [
    UserService,
    CreateUserUseCase,
    UserRepository,
    UpdateUserRawUseCase
  ],
  exports:[
    UserService,
    UserRepository
  ]
})
export class UserModule {
  
}

  