import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SlotRule, SlotType } from 'src/entity';
import { pick } from 'src/common/utils';
import { SlotTypeService } from 'src/slot-type';
import { AuthService } from 'src/auth';

import { SlotRuleCreation, SlotRuleUpdate } from './types';

@Injectable()
export class SlotRuleService {
  public constructor(
    @InjectRepository(SlotRule)
    private readonly slotRuleRepository: Repository<SlotRule>,
    private readonly slotTypeService: SlotTypeService,
    private readonly authService: AuthService,
  ) {}

  public async create(creation: SlotRuleCreation, userEmail: string) {
    const slotType = await this.slotTypeService.getOrThrow(creation.slotTypeId);
    const instance = this.slotRuleRepository.create(creation);
    await this.validateSlotNotColliding(creation, userEmail, slotType);

    [instance.slotType, instance.user] = await Promise.all([
      this.slotTypeService.getOrThrow(creation.slotTypeId),
      this.authService.getUserOrThrow(userEmail),
    ]);

    return this.deleteSensitiveDataFromInstance(
      await this.slotRuleRepository.save(instance),
    );
  }

  public async getAllOwnedByUser(userEmail: string) {
    return (
      await this.slotRuleRepository.find({
        relations: ['slotType'],
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
    update: SlotRuleUpdate,
    userEmail: string,
  ) {
    const possibleInstance = await this.slotRuleRepository.findOne({
      relations: ['user'],
      where: { id },
    });

    if (
      possibleInstance === null ||
      possibleInstance.user.email !== userEmail
    ) {
      return;
    }

    Object.assign(possibleInstance, update);

    if (update.slotTypeId !== undefined) {
      possibleInstance.slotType = await this.slotTypeService.getOrThrow(
        update.slotTypeId,
      );
    }

    return await this.slotRuleRepository.save(possibleInstance);
  }

  public async deleteIfUserOwns(id: number, userEmail: string) {
    await this.slotRuleRepository.delete({
      id,
      user: {
        email: userEmail,
      },
    });
  }

  public deleteSensitiveDataFromInstance(instance: SlotRule) {
    if ('user' in instance) {
      delete (instance as any).user;
    }

    return instance;
  }

  private async validateSlotNotColliding(creation: SlotRuleCreation, userEmail: string, slotType: SlotType) {
    const userSlotRules = await this.getAllOwnedByUser(userEmail);

    const newSlotStart = creation.time;
    const newSlotEnd = creation.time + creation.slotsCount * slotType.duration;

    for (const slotRule of userSlotRules) {
      const slotStart = slotRule.time;
      const slotEnd = slotRule.time + slotRule.slotsCount * slotType.duration;

      if ((newSlotStart >= slotStart && newSlotStart < slotEnd) ||
          (newSlotEnd > slotStart && newSlotEnd <= slotEnd) ||
           (slotStart >= newSlotStart && slotStart < newSlotEnd) ||
           (slotEnd > newSlotStart && slotEnd <= newSlotEnd))
           {
        throw new Error('The new slot collides with an existing slot');
      }
    }
  }
}
