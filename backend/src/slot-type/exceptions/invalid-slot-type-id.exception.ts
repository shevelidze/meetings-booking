import { BadRequestException } from '@nestjs/common';

export class InvalidSlotTypeIdException extends BadRequestException {
  constructor() {
    super('Invalid slot type id.');
  }
}
