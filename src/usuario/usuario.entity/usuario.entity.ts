/* eslint-disable prettier/prettier */

import { BonoEntity } from '../../bono/bono.entity/bono.entity';
import { ClaseEntity } from '../../clase/clase.entity/clase.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  numCedula: number;

  @Column()
  nombre: string;

  @Column()
  grupoInvestigacion: string;

  @Column('integer')
  numExtension: number;

  @Column()
  rol: string;

  @Column()
  idJefe: string;

  @OneToMany(() => BonoEntity, (bono) => bono.usuario)
  bonos: BonoEntity[];

  @OneToMany(() => ClaseEntity, (clase) => clase.usuario)
  clases: ClaseEntity[];
}
