import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: User) {
    // TODO: Add aditional validations like if register is disabled

    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new HttpException({ message: 'User already exists' }, 400);
    }
    try {
      validate(user);
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: 'Validation Error', error: e }, 400);
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword;
    try {
      await this.usersService.create(user);
    } catch (error) {
      throw new HttpException({ message: 'Error creating user' }, 500);
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException({ message: 'User does not exist' });
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({ message: 'Password is incorrect' });
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

 
}
