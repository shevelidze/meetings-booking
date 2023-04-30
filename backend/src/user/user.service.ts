import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const update: Partial<User> = {firstName: updateUserDto.firstName, lastName: updateUserDto.lastName};

    if(updateUserDto.password){
      update.passwordHash = this.generatePasswordHash(updateUserDto.password);
    }
    Object.assign(user, update);
    return await this.userRepository.save(user);
  }

  private generatePasswordHash(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}