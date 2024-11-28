/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseEntity } from './clase.entity/clase.entity'; 
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ClaseService {
    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>,
    ) {}

    // Crear un nuevo propuestao
    async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
        if (clase.codigo.length>10){
            return await this.claseRepository.save(clase);
        }else{
            throw new BusinessLogicException('The clase is menor que 10', BusinessError.PRECONDITION_FAILED);
        }
    }

    async findClaseById(id: string): Promise<ClaseEntity> {
        const clase: ClaseEntity = await this.claseRepository.findOne({ where: { id } });
        if (!clase) {
            throw new BusinessLogicException('The clase with the given id was not found', BusinessError.NOT_FOUND);
        }
        return clase;
    }

}
