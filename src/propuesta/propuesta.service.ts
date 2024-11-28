/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestarepository: Repository<PropuestaEntity>,
    ) {}

    // Crear un nuevo propuestao
    async crearpropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        if (propuesta.titulo!=''){
            return await this.propuestarepository.save(propuesta);
        }else{
            throw new BusinessLogicException('The propuesta is vacia', BusinessError.PRECONDITION_FAILED);
        }
    }
    
    // // Obtener todos los propuestaos
    async findAll(): Promise<PropuestaEntity[]> {
        return await this.propuestarepository.find();
    }

    // Obtener propuestao por ID
    async findpropuestaById(id: string): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestarepository.findOne({ where: { id } });
        if (!propuesta) {
            throw new BusinessLogicException('The propuesta with the given id was not found', BusinessError.NOT_FOUND);
        }
        return propuesta;
    }


    // // Actualizar un propuestao
    // async update(id: string, propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    //     const persistedpropuesta: PropuestaEntity = await this.propuestarepository.findOne({ where: { id } });
    //     if (!persistedpropuesta) {
    //         throw new BusinessLogicException('The propuesta with the given id was not found', BusinessError.NOT_FOUND);
    //     }
    //     return await this.propuestarepository.save({ ...persistedpropuesta, ...propuesta });
    // }

    // Eliminar un propuestao
    // async deletePropuesta(id: string) {
    //     const propuesta: PropuestaEntity = await this.propuestarepository.findOne({ where: { id } });
    //     if (!propuesta) {
    //         throw new BusinessLogicException('The propuesta with the given id was not found', BusinessError.NOT_FOUND);
    //     }else if(propuesta.proyecto){
    //         throw new BusinessLogicException('The propuesta has a proyecto', BusinessError.PRECONDITION_FAILED);
    //     }
    //     await this.propuestarepository.remove(propuesta);
    // }

}
