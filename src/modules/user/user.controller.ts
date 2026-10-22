import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { User } from '@/entities/user';
import { UsernameRequestDto } from '@/dtos/request/username.request.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getUserByUsername(@Param() param: UsernameRequestDto): Promise<User> {
    return this.userService.getUserByUsername(param.username);
  }

  @Post()
  async createUser(@Body() body: UsernameRequestDto): Promise<User> {
    return this.userService.createUser(body.username);
  }
}
