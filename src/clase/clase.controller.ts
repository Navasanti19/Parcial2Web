/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ClaseService } from './clase.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { ClaseDto } from './clase.dto/clase.dto';
import { plainToInstance } from 'class-transformer';
import { ClaseEntity } from './clase.entity/clase.entity';

@Controller('clases')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  async create(@Body() claseDto: ClaseDto) {
    const clase: ClaseEntity = plainToInstance(ClaseEntity, claseDto);
    return await this.claseService.crearClase(clase);
  }

  @Get(':claseId')
  async findById(@Param('claseId') claseId: string) {
    return await this.claseService.findClaseById(claseId);
  }
}
