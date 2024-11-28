/* eslint-disable prettier/prettier */

// import { BiteEntity } from '../../bite/bite.entity/bite.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('integer')
    numCedula: number;

    @Column()
    nombre: string;

    // @Column('decimal', { precision: 10, scale: 2 })
    @Column()
    grupoInvestigacion: string;

    @Column('integer')
    numExtension: number;

    @Column()
    rol: string;

    @Column()
    idJefe: string;

    @ManyToOne(()=> BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];

    @ManyToOne(()=> ClaseEntity, clase => clase.usuario)
    clases: ClaseEntity[];



}
