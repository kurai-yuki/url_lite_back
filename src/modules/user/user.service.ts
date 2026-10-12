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
      throw new NotFoundException('Usuário não encontrando!', {
        description: 'User with this username not found.',
      });
    }

    return user;
  }

  async createUser(username: string): Promise<User> {
    const alredyExists = await this.userRepository.getUserByUsername(username);
    if (alredyExists) {
      throw new ConflictException('Usuário com esse nome já existe!', {
        description: 'User with this username alredy exists!',
      });
    }

    await this.userRepository.create({
      username,
    });

    return this.getUserByUsername(username);
  }
}
