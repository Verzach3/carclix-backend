import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email: email } });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }

  async create(user: User) {
    return await this.prisma.user.create({ data: user });
  }

  async edit(newUser: User, id: number) {
    return await this.prisma.user.update({
      where: { id: id },
      data: newUser,
    });
  }
}
