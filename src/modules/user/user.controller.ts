import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRequestDto } from '@/dtos/request/create-user.request.dto';
import { GetUserByUserNameRequestDto } from '@/dtos/request/get-user-by-username.request.dto';
import { UserService } from '@/user/user.service';
import { User } from '@/entities/user';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getUserByUsername(
    @Param() param: GetUserByUserNameRequestDto,
  ): Promise<User> {
    return this.userService.getUserByUsername(param.username);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserRequestDto): Promise<User> {
    return this.userService.createUser(createUserDto.username);
  }
}
