import { BadRequestException } from '@nestjs/common';

export class InvalidUserEmailException extends BadRequestException {
  constructor() {
    super('Invalid user email.');
  }
}
