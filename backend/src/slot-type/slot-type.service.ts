import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SlotType } from 'src/entity';
import { LanguageService } from 'src/language';
import { pick } from 'src/common/utils';
import { AuthService } from 'src/auth';

import { SlotTypeCreation, SlotTypeUpdate } from './types';
import { InvalidSlotTypeIdException } from './exceptions';

@Injectable()
export class SlotTypeService {
  public constructor(
    @InjectRepository(SlotType)
    private readonly slotTypeRepository: Repository<SlotType>,
    private readonly languageService: LanguageService,
    private readonly authService: AuthService,
  ) {}

  public async create(creation: SlotTypeCreation, userEmail: string) {
    const instance = this.slotTypeRepository.create(creation);

    [instance.defaultLanguage, instance.user] = await Promise.all([
      typeof creation.defaultLanguageId === 'number'
        ? this.languageService.getOrThrow(creation.defaultLanguageId)
        : null,
      this.authService.getUserOrThrow(userEmail),
    ]);

    return this.deleteSensitiveDataFromInstance(
      await this.slotTypeRepository.save(instance),
    );
  }

  public async getAllOwnedByUser(userEmail: string) {
    return (
      await this.slotTypeRepository.find({
        relations: ['defaultLanguage'],
        where: {
          user: {
            email: userEmail,
          },
        },
      })
    ).map((mapInstance) => this.deleteSensitiveDataFromInstance(mapInstance));
  }

  public async updateIfUserOwns(
    id: number,
    update: SlotTypeUpdate,
    userEmail: string,
  ) {
    const possibleInstance = await this.slotTypeRepository.findOneBy({ id });

    if (
      possibleInstance === null ||
      possibleInstance.user.email !== userEmail
    ) {
      return;
    }

    Object.assign(possibleInstance, pick(update, 'duration', 'name'));

    if (update.defaultLanguageId !== undefined) {
      possibleInstance.defaultLanguage =
        update.defaultLanguageId !== null
          ? await this.languageService.getOrThrow(update.defaultLanguageId)
          : null;
    }

    await this.slotTypeRepository.save(possibleInstance);
  }

  public async deleteIfUserOwns(id: number, userEmail: string) {
    await this.slotTypeRepository.delete({
      id,
      user: {
        email: userEmail,
      },
    });
  }

  public async isValidId(id: number) {
    return await this.slotTypeRepository.exist({
      where: {
        id,
      },
    });
  }

  public async getOrThrow(id: number) {
    const possibleInstance = await this.slotTypeRepository.findOneBy({ id });

    if (possibleInstance === null) {
      throw new InvalidSlotTypeIdException();
    }

    return possibleInstance;
  }

  public deleteSensitiveDataFromInstance(instance: SlotType) {
    if ('user' in instance) {
      delete (instance as any).user;
    }

    return instance;
  }
}
