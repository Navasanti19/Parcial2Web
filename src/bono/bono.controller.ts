/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BonoService } from './bono.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { BonoDto } from './bono.dto/bono.dto';
import { plainToInstance } from 'class-transformer';
import { BonoEntity } from './bono.entity/bono.entity';

@Controller('bonos')
@UseInterceptors(BusinessErrorsInterceptor)
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  @Post()
  async create(@Body() bonoDto: BonoDto) {
    const bono: BonoEntity = plainToInstance(BonoEntity, bonoDto);
    return await this.bonoService.crearBono(bono);
  }

  @Get('/clase/:claseId')
  async findByCodigo(@Param('claseId') claseId: string) {
    return await this.bonoService.findbonoByCodigo(claseId);
  }

  @Get('/usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId') usuarioId: string) {
    return await this.bonoService.findallBonosByUsuario(usuarioId);
  }

  @Delete(':bonoId')
  @HttpCode(204)
  async delete(@Param('bonoId') bonoId: string) {
    return await this.bonoService.deleteBono(bonoId);
  }
}
