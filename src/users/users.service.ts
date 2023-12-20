import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async create(user: User) {
    return this.userRepository.save(user);
  }
}
