import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Language } from 'src/entity';

import { InvalidLanguageIdException } from './exceptions';

@Injectable()
export class LanguageService {
  public constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  public async isValidId(id: number) {
    return await this.languageRepository.exist({
      where: {
        id,
      },
    });
  }

  public async checkId(id: number) {
    if (!(await this.isValidId(id))) {
      throw new InvalidLanguageIdException();
    }
  }

  public async getOrThrow(id: number) {
    const possibleInstance = await this.languageRepository.findOneBy({
      id,
    });

    if (possibleInstance === null) {
      throw new InvalidLanguageIdException();
    }

    return possibleInstance;
  }
}
