/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';

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

  async crearBono(bono: BonoEntity): Promise<BonoEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id: bono.usuario.id },
    });
    if (bono.monto && bono.monto > 0 && usuario.rol === 'Profesor') {
      return await this.bonoRepository.save(bono);
    }

    throw new BusinessLogicException(
      'The bono is vacia',
      BusinessError.PRECONDITION_FAILED,
    );
  }

  async findbonoByCodigo(codigo: string): Promise<BonoEntity[]> {
    const clase = await this.claseRepository.findOne({ where: { codigo } });
    if (!clase) {
      throw new BusinessLogicException(
        'The class with the given code was not found',
        BusinessError.NOT_FOUND,
      );
    }
    const bonos = await this.bonoRepository.find({ where: { clase } });
    if (bonos.length === 0) {
      throw new BusinessLogicException(
        'The bono with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return bonos;
  }

  async findallBonosByUsuario(usuarioId: string): Promise<BonoEntity[]> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });
    if (!usuario) {
      throw new BusinessLogicException(
        'The user with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    const bonos = await this.bonoRepository.find({ where: { usuario } });
    if (bonos.length === 0) {
      throw new BusinessLogicException(
        'The bono with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return bonos;
  }

  async deleteBono(id: string) {
    const bono: BonoEntity = await this.bonoRepository.findOne({
      where: { id },
    });
    if (!bono) {
      throw new BusinessLogicException(
        'The bono with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    } else if (bono.calificacion > 4) {
      throw new BusinessLogicException(
        'The bono has a calificacion>4',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    await this.bonoRepository.remove(bono);
  }
}
