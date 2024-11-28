/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
// import { ProfesorController } from './product.controller';

@Module({
  providers: [ClaseService],
  imports: [TypeOrmModule.forFeature([ClaseEntity])],
  // controllers: [ProfesorController],
  exports: [ClaseService],
})
export class ClaseModule {}
