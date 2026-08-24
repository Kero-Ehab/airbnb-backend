import { Injectable, NotFoundException } from '@nestjs/common';
import { UnitRepository } from '../repositories/unit.repository';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindByIdUsecase {
  constructor(private readonly unitsRepository: UnitRepository) {}

  async execute(id: string): Promise<UnitResponseDto> {
    const unit = await this.unitsRepository.findOne({
      _id: id,
      isDeleted: false,
      isActive: true,
    });
    if (!unit) throw new NotFoundException(`Unit with id ${id} not found`);
    return plainToInstance(UnitResponseDto, unit);
  }
}