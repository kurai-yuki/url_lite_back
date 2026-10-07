import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRequestDto } from '@/dtos/request/create-user.request.dto';
import { getUserByUserNameRequestDto } from '@/dtos/request/get-user-by-username.request.dto';
import { UserService } from '@/user/user.service';
import { User } from '@/entities/user';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getUserByUsername(
    @Param() param: getUserByUserNameRequestDto,
  ): Promise<User> {
    return this.userService.getUserByUsername(param.username);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserRequestDto): Promise<void> {
    return this.userService.createUser(createUserDto.username);
  }
}
