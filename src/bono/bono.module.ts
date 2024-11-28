/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { BonoController } from './bono.controller';

@Module({
  providers: [BonoService],
  imports: [TypeOrmModule.forFeature([BonoEntity])],
  controllers: [BonoController],
  exports: [BonoService],
})
export class BonoModule {}
