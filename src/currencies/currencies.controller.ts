import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyIdDto } from './dtos/currency-id.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginationResult } from "src/common/data-access";
import { Authorize } from '../auth/decorators/roles.decorator';
import { Roles } from 'src/common/constants/roles.constants';
import { Public } from 'src/auth/decorators/public.decorators';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Authorize(Roles.SYSTEM_ADMIN)
  @Post()
  async create(@Body() body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    return this.currenciesService.create(body);
  }
  @Public()
  @Get('/:id')
  async getCurrencyById(
    @Param() param: CurrencyIdDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.getCurrencyById(param.id);
  }

  @Public()
  @Get()
  async findAll(
    @Query() query: FindAllDto,
  ): Promise<PaginationResult<CurrencyResponseDto>> {
    return this.currenciesService.findAll(query);
  }

  @Authorize(Roles.SYSTEM_ADMIN)
  @Delete('/:id')
  async deleteCurrencyById(@Param() param: CurrencyIdDto): Promise<void> {
    return this.currenciesService.deleteById(param.id);
  }

  @Authorize(Roles.SYSTEM_ADMIN)
  @Patch('/:id')
  async update(
    @Param() param: CurrencyIdDto,
    @Body() body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.updateById(param.id, body);
  }
}