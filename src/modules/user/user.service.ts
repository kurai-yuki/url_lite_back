import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '@/user/user.repository';
import { User } from '@/entities/user';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User with this username not found!');
    }

    return user;
  }

  async createUser(username: string): Promise<void> {
    const alredyExists = await this.getUserByUsername(username);

    if (alredyExists) {
      throw new ConflictException('User with this username alredy exists!');
    }

    await this.userRepository.create({
      username,
    });
  }
}
