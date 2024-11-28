/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity/bono.entity'; 
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@Injectable()
export class BonoService {
    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,

        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}

    // Crear un nuevo bonoo
    async crearBono(bono: BonoEntity): Promise<BonoEntity> {
        if (bono.monto && bono.monto>0 && bono.usuario.rol==='profesor'){
            return await this.bonoRepository.save(bono);
        }else{
            throw new BusinessLogicException('The bono is vacia', BusinessError.PRECONDITION_FAILED);
        }
    }


    // Obtener bonoo por ID
    async findbonoByCodigo(codigo: string): Promise<BonoEntity[]> {
        const clase: ClaseEntity =await this.claseRepository.findOne({ where: { codigo } })
        const bono: BonoEntity[] = await this.bonoRepository.find({ where: { clase } });
        if (!bono) {
            throw new BusinessLogicException('The bono with the given id was not found', BusinessError.NOT_FOUND);
        }
        return bono;
    }

    async findallBonosByUsuario(id: string): Promise<BonoEntity[]> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id } });
        const bono: BonoEntity[] = await this.bonoRepository.find({ where: { usuario } });
        if (!bono) {
            throw new BusinessLogicException('The bono with the given id was not found', BusinessError.NOT_FOUND);
        }
        return bono;
    }


    async deleteBono(id: string) {
        const bono: BonoEntity = await this.bonoRepository.findOne({ where: { id } });
        if (!bono) {
            throw new BusinessLogicException('The bono with the given id was not found', BusinessError.NOT_FOUND);
        }else if(bono.calificacion>4){
            throw new BusinessLogicException('The bono has a calificacion>4', BusinessError.PRECONDITION_FAILED);
        }
        await this.bonoRepository.remove(bono);
    }

}
