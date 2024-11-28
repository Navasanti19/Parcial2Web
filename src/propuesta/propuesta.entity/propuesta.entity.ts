/* eslint-disable prettier/prettier */

// import { BiteEntity } from '../../bite/bite.entity/bite.entity';
// import { ProfesorEntity } from 'src/components/profesor/profesor.entity/profesor.entity';
// import { ProyectoEntity } from 'src/components/proyecto/proyecto.entity/proyecto.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropuestaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    palabraClave: string;

    // @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
    // proyecto: ProyectoEntity;

    // @OneToMany(() => ProfesorEntity, profesor => profesor.propuesta)
    // profesores: ProfesorEntity[];
}
