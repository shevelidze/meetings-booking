import { applyDecorators } from '@nestjs/common';
import { ValidateIf, ValidationOptions } from 'class-validator';

export const ValidateIfDefined = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    ValidateIf((object, value) => value !== undefined, validationOptions),
  );
