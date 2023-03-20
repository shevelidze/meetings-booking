import { BadRequestException } from '@nestjs/common';

export class InvalidLanguageIdException extends BadRequestException {
  constructor() {
    super('Invalid language id.');
  }
}
