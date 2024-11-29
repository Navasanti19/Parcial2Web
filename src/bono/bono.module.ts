/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoController } from './bono.controller';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';

@Module({
  providers: [BonoService],
  imports: [TypeOrmModule.forFeature([BonoEntity, UsuarioEntity, ClaseEntity])],
  controllers: [BonoController],
  exports: [BonoService],
})
export class BonoModule {}
