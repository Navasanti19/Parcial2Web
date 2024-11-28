/* eslint-disable prettier/prettier */

// import { BiteEntity } from '../../bite/bite.entity/bite.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column('integer')
    creditos: number;

    @OneToMany(()=>UsuarioEntity, usuario=>usuario.clases)
    usuario: UsuarioEntity;

    @ManyToOne(()=> BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];

}
