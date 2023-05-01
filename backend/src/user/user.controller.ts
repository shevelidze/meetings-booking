import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEmail } from 'src/auth';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  async getProfile(@UserEmail() userEmail: string,) {
    return this.userService.getUserByEmail(userEmail);
  }


  @Post()
  async updateProfile(@UserEmail() userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(userEmail, updateUserDto);
  }
}