/* eslint-disable prettier/prettier */

// import { BiteEntity } from '../../bite/bite.entity/bite.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BonoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    monto: number;

    @Column('decimal')
    calificacion: number;

    @Column()
    palabraClave: string;

    @ManyToOne(()=>UsuarioEntity, usuario=>usuario.bonos)
    usuario: UsuarioEntity;

    @ManyToOne(()=>ClaseEntity, clase=>clase.bonos)
    clase: ClaseEntity;

    
}
