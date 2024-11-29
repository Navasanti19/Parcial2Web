/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('BonoService', () => {
  let service: BonoService;
  let bonoRepository: Repository<BonoEntity>;
  let claseRepository: Repository<ClaseEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;
  let bonoList: BonoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BonoService],
    }).compile();

    service = module.get<BonoService>(BonoService);
    bonoRepository = module.get<Repository<BonoEntity>>(
      getRepositoryToken(BonoEntity),
    );
    claseRepository = module.get<Repository<ClaseEntity>>(
      getRepositoryToken(ClaseEntity),
    );
    usuarioRepository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    bonoRepository.clear();
    claseRepository.clear();
    usuarioRepository.clear();
    bonoList = [];
    for (let i = 0; i < 5; i++) {
      const usuario = await usuarioRepository.save({
        numCedula: faker.number.int({ min: 1, max: 999 }),
        nombre: faker.person.firstName(),
        grupoInvestigacion: faker.string.sample(),
        numExtension: faker.number.int({ min: 1, max: 999 }),
        rol: 'profesor',
        idJefe: faker.string.uuid(),
      });

      const clase = await claseRepository.save({
        nombre: faker.person.firstName(),
        codigo: faker.string.sample(),
        creditos: faker.number.int({ min: 1, max: 999 }),
      });

      const bono = await bonoRepository.save({
        monto: faker.number.int({ min: 5, max: 100 }),
        calificacion: faker.number.float({ min: 5, max: 5 }),
        palabraClave: faker.word.words(1),
        usuario: usuario,
        clase: clase,
      });
      bonoList.push(bono);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findbonoByCodigo should return bonos for a valid class code', async () => {
    const storedBono: BonoEntity = bonoList[0];
    const bono: BonoEntity[] = await service.findbonoByCodigo(
      storedBono.clase.codigo,
    );

    expect(bono).toHaveLength(1);
    expect(bono[0].monto).toEqual(storedBono.monto);
  });

  it('findbonoByCodigo should throw an exception if no bonos are found for the class code', async () => {
    const codigo = '123';
    await expect(service.findbonoByCodigo(codigo)).rejects.toHaveProperty(
      'message',
      'The class with the given code was not found',
    );
  });

  it('findallBonosByUsuario should return bonos for a valid user', async () => {
    const storedBono: BonoEntity = bonoList[0];
    const bono: BonoEntity[] = await service.findallBonosByUsuario(
      storedBono.usuario.id,
    );
    expect(bono).toHaveLength(1);
    expect(bono[0].monto).toEqual(storedBono.monto);
  });

  it('findallBonosByUsuario should throw an exception if no bonos are found for the user', async () => {
    const id = '0';
    await expect(service.findallBonosByUsuario(id)).rejects.toHaveProperty(
      'message',
      'The user with the given id was not found',
    );
  });

  it('crearBono should create and return a bono if valid', async () => {
    const storedBono: BonoEntity = bonoList[0];
    const bono: BonoEntity = {
      id: '',
      monto: 100,
      calificacion: 4,
      palabraClave: 'clave',
      usuario: storedBono.usuario,
      clase: storedBono.clase,
    };

    const result = await service.crearBono(bono);
    expect(result).not.toBeNull();
    expect(result.monto).toEqual(bono.monto);
    expect(result.usuario.id).toEqual(bono.usuario.id);
  });

  it('crearBono should throw an exception if monto is invalid or role is not "profesor"', async () => {
    const storedBono: BonoEntity = bonoList[0];
    const bono: BonoEntity = {
      id: '',
      monto: -100,
      calificacion: 4,
      palabraClave: 'clave',
      usuario: storedBono.usuario,
      clase: storedBono.clase,
    };

    await expect(service.crearBono(bono)).rejects.toHaveProperty(
      'message',
      'The bono is vacia',
    );
  });

  it('deleteBono should remove a bono if valid', async () => {
    const storedBono: BonoEntity = bonoList[0];
    storedBono.calificacion = 2;
    await bonoRepository.save(storedBono);
    await service.deleteBono(storedBono.id);
    const deletedBono = await bonoRepository.findOne({
      where: { id: storedBono.id },
    });
    expect(deletedBono).toBeNull();
  });

  it('deleteBono should throw an exception if bono not found', async () => {
    await expect(service.deleteBono('0')).rejects.toHaveProperty(
      'message',
      'The bono with the given id was not found',
    );
  });

  it('deleteBono should throw an exception if calificacion > 4', async () => {
    const storedBono: BonoEntity = bonoList[0];
    await expect(service.deleteBono(storedBono.id)).rejects.toHaveProperty(
      'message',
      'The bono has a calificacion>4',
    );
  });
});
