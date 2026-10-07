import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRequestDto } from '@/dtos/request/create-user.request.dto';
import { getUserByUserNameRequestDto } from '@/dtos/request/get-user-by-username.request.dto';
import { UserService } from '@/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getUserByUsername(@Param() param: getUserByUserNameRequestDto) {
    return this.userService.getUserByUsername(param.username);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserRequestDto) {
    return this.userService.createUser(createUserDto.username);
  }
}
