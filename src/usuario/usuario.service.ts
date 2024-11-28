/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    if (usuario.rol === 'Profesor') {
      if (usuario.grupoInvestigacion in ['TICSW', 'IAMAGINE', 'COMIT']) {
        return await this.usuarioRepository.save(usuario);
      } else {
        throw new BusinessLogicException(
          'The usuario is not in grupos Investigacion',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    } else if (usuario.rol === 'Decana') {
      if (usuario.numExtension.toString().length == 8) {
        return await this.usuarioRepository.save(usuario);
      } else {
        throw new BusinessLogicException(
          'The usuario is not igual a 8 extension',
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }
  }

  async findUsuarioById(id: string): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new BusinessLogicException(
        'The usuario with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return usuario;
  }

  // Eliminar un profesoro
  async eliminarUsuario(id: string) {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuario) {
      throw new BusinessLogicException(
        'The usuario with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    } else if (usuario.rol === 'Decana') {
      throw new BusinessLogicException(
        'The usuariois a Decana',
        BusinessError.PRECONDITION_FAILED,
      );
    } else if (usuario.bonos) {
      throw new BusinessLogicException(
        'The usuario has  bonos asociados',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    await this.usuarioRepository.remove(usuario);
  }
}
